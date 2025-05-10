import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './add-news-post.module.scss';
import { ChangeEvent, useMemo, useRef } from 'react';
import { Header } from '../../components/header/header.tsx';
import { Container, FormControl, FormHelperText, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { setAppError } from '../../../app/app-slice.ts';
import { useDeleteImageMutation, useUploadImageMutation } from '../../../features/file-upload/api/upload-api.ts';
import { useGetAllCategoriesQuery } from '../../../features/category/api/categoryApi.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createNewsSchema, NewsFormData } from '../../../features/news/model/create-news-schema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUser } from '../../context/user-context.tsx';
import { useCreateNewsMutation } from '../../../features/news/api/news-api.ts';
import { useNavigate } from 'react-router-dom';


export const AddNewsPost = () => {
  const {
    control,
    handleSubmit,
    register,
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
      categoryId: '' as unknown as number,
    },
  });
  const inputFileRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [uploadImage, { isLoading: isUpLoading }] = useUploadImageMutation();
  const [deleteImage, { isLoading: isDeleteImageLoading }] = useDeleteImageMutation();

  const [createNews] = useCreateNewsMutation();

  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
  const categories = categoriesResponse?.data || [];

  const { user } = useUser();

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'news');

      const { data: url } = await uploadImage(formData).unwrap();
      setValue('image', url);
    } catch (error: any) {
      const message =
        error?.data?.message || error?.error || 'Произошла ошибка при загрузке изображения';
      dispatch(setAppError({ error: message }));
    }
  };

  const onClickRemoveImage = async () => {
    try {
      const formData = new FormData();
      const fullPath = watch('image');
      const fileName = fullPath.split('/').pop() || '';
      formData.append('fileName', fileName);
      formData.append('category', 'news');

      await deleteImage(formData).unwrap();
      setValue('image', '');

      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    } catch (error: any){
      const message =
        error?.data?.message || error?.error || 'Произошла ошибка при удалении изображения';
      dispatch(setAppError({ error: message }));
    }
  };

  const onSubmit: SubmitHandler<NewsFormData> = async (data) => {
    try {
      const newsData = {
        ...data,
        authorId: user!.id,
        tags: data.tags.split(',').map(tag => tag.trim()),
      };

      await createNews(newsData).unwrap();
      alert('Новость успешно отправлена на модерацию!');
      reset();
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
      navigate('/');
    } catch (error: any) {
      const message =
        error?.data?.message || error?.error || 'Произошла ошибка при создании новости';
      dispatch(setAppError({ error: message }));
    }
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'add-post-editor',
      },
    }),
    [],
  );

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 2 }}>
        {(isUpLoading || isDeleteImageLoading) && (<LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />)}
        <Paper style={{ padding: 30 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button onClick={() => inputFileRef.current?.click()} variant="outlined" size="large">
              Загрузить превью
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
            {watch('image') && (
              <>
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={onClickRemoveImage}>
                  Удалить
                </Button>
                <img className={styles.image} src={`${import.meta.env.VITE_API_BASE_URL}${watch('image')}`}
                     alt="Uploaded" />
              </>
            )}
            <br />
            <br />
            <FormControl fullWidth error={!!errors.categoryId} sx={{ mt: 2, mb: 2 }}>
              <InputLabel>Категория</InputLabel>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Категория"
                    value={field.value || ''}
                    required
                  >
                    {isCategoriesLoading && <MenuItem disabled>Загрузка категорий...</MenuItem>}
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <TextField
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              classes={{ root: styles.title }}
              variant="standard"
              placeholder="Заголовок статьи..."
              fullWidth
            />
            <TextField
              {...register('tags')}
              error={!!errors.tags}
              helperText={errors.tags?.message}
              classes={{ root: styles.tags }}
              variant="standard"
              placeholder="Тэги"
              fullWidth />

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
              <Button
                type="submit"
                disabled={isSubmitting || isUpLoading}
                size="large"
                variant="contained">
                Отправить на модерацию
              </Button>
              <a href="/">
                <Button size="large">Отмена</Button>
              </a>
            </div>
          </form>
        </Paper>
      </Container>;
    </>
  );
};