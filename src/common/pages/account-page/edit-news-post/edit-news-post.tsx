import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  FormControl, FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './edit-news-post.module.scss';
import { useAppDispatch } from '../../../hooks';
import { useUser } from '../../../context/user-context.tsx';
import { useGetOneNewsQuery, useUpdateNewsMutation } from '../../../../features/news/api/news-api.ts';
import { createNewsSchema, NewsFormData } from '../../../../features/news/model/create-news-schema.ts';
import { useDeleteImageMutation, useUploadImageMutation } from '../../../../features/file-upload/api/upload-api.ts';
import { useGetAllCategoriesQuery } from '../../../../features/category/api/categoryApi.ts';
import { setAppError } from '../../../../app/app-slice.ts';
import { Header } from '../../../components/header/header.tsx';
import { NewsUpdate } from '../../../../features/news/types/news.types.ts';

export const EditNewsPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { data: newsResponse, isLoading: isNewsLoading } = useGetOneNewsQuery(Number(id!));
  const newsData = newsResponse?.data;
  const [updateNews, { isLoading: isUpdateNewsLoading }] = useUpdateNewsMutation();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormData>({
    resolver: yupResolver(createNewsSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
      image: '',
      categoryId: undefined as unknown as number, // Исправлена инициализация
    },
  });

  const [uploadImage, { isLoading: isUpLoading }] = useUploadImageMutation();
  const [deleteImage, { isLoading: isDeleteImageLoading }] = useDeleteImageMutation();
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
  const categories = categoriesResponse?.data || [];
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newsData) {
      const newsItem = Array.isArray(newsData) ? newsData[0] : newsData;

      // Явное преобразование categoryId к number
      reset({
        ...newsItem,
        tags: newsItem.tags.map((tag: { name: string }) => tag.name).join(', '),
        categoryId: Number(newsItem.category.id),
      });
    }
  }, [newsData, reset]);

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'news');

      const { data: url } = await uploadImage(formData).unwrap();
      setValue('image', url);
    } catch (error: any) {
      dispatch(setAppError({ error: error?.data?.message || 'Ошибка загрузки изображения' }));
    }
  };

  const handleDeleteImage = async () => {
    try {
      const currentImage = watch('image');
      if (!currentImage) return;

      const formData = new FormData();
      const fileName = currentImage.split('/').pop()!;
      formData.append('fileName', fileName);
      formData.append('category', 'news');

      await deleteImage(formData).unwrap();
      setValue('image', '');

      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    } catch (error: any) {
      dispatch(setAppError({ error: error?.data?.message || 'Ошибка удаления изображения' }));
    }
  };

  const onSubmit: SubmitHandler<NewsFormData> = async (data) => {
    try {
      if (!user) {
        dispatch(setAppError({ error: 'Пользователь не авторизован' }));
        return;
      }
      const numId = Number(id!)
      const updateData: NewsUpdate = {
        id: numId,
        title: data.title,
        content: data.content,
        image: data.image,
        authorId: user.id,
        tags: data.tags.split(',').map(tag => tag.trim()),
        categoryId: Number(data.categoryId), // Явное преобразование типа
      };

      await updateNews({ newsUpdated: updateData, id: numId }).unwrap(); // Упрощенный вызов мутации
      navigate(-1);
    } catch (error: any) {
      dispatch(setAppError({ error: error?.data?.message || 'Ошибка обновления новости' }));
    }
  };

  const options = useMemo(() => ({
    spellChecker: false,
    maxHeight: '400px',
    autofocus: true,
    placeholder: 'Введите текст...',
    status: false,
    autosave: { enabled: true, delay: 1000, uniqueId: 'edit-post-editor' },
  }), []);

  if (isNewsLoading || isUpdateNewsLoading) return <LinearProgress />;

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 2 }}>
        {(isUpLoading || isDeleteImageLoading || isCategoriesLoading) && (
          <LinearProgress sx={{ position: 'fixed', top: 0, left: 0, right: 0 }} />
        )}
        <Paper style={{ padding: 30 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button onClick={() => inputFileRef.current?.click()} variant="outlined" size="large">
              Загрузить превью
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />

            {watch('image') && (
              <>
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleDeleteImage}>
                  Удалить
                </Button>
                <img className={styles.image} src={`${import.meta.env.VITE_API_BASE_URL}${watch('image')}`}
                     alt="Uploaded" />
              </>
            )}

            <FormControl fullWidth error={!!errors.categoryId} sx={{ mt: 2, mb: 2 }}>
              <InputLabel>Категория</InputLabel>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Категория"
                    value={field.value ?? ''}
                  >
                    {categories.map(category => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.categoryId && <FormHelperText error>{errors.categoryId.message}</FormHelperText>}
            </FormControl>

            <TextField
              {...control.register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              variant="standard"
              placeholder="Заголовок статьи"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              {...control.register('tags')}
              error={!!errors.tags}
              helperText={errors.tags?.message}
              variant="standard"
              placeholder="Тэги"
              fullWidth
              sx={{ mb: 2 }}
            />

            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <SimpleMDE
                  {...field}
                  className={styles.editor}
                  options={options}
                />
              )}
            />
            {errors.content && <FormHelperText error>{errors.content.message}</FormHelperText>}

            <div className={styles.buttons}>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                Обновить
              </Button>
              <Button size="large" onClick={() => navigate(-1)}>Отмена</Button>
            </div>
          </form>
        </Paper>
      </Container>
    </>
  );
};