import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './add-news-post.module.scss';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { Header } from '../../components/header/header.tsx';
import { Container, LinearProgress } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { setAppError } from '../../../app/app-slice.ts';
import { useUploadImageMutation } from '../../../features/file-upload/api/upload-api.ts';

export const AddNewsPost = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [uploadImage, { isLoading: isUpLoading }] = useUploadImageMutation();

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
      setImageUrl(url);
    } catch (error: any) {
      const message =
        error?.data?.message || error?.error || 'Произошла ошибка при загрузке изображения';
      dispatch(setAppError({ error: message }));
    }
  };

  const onClickRemoveImage = () => {
  };

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
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
        {isUpLoading && (<LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />)}
        <Paper style={{ padding: 30 }}>
          <Button onClick={() => inputFileRef.current?.click()} variant="outlined" size="large">
            Загрузить превью
          </Button>
          <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
          {imageUrl && (
            <>
              <Button sx={{m:2}} variant="contained" color="error" onClick={onClickRemoveImage}>
                Удалить
              </Button>
              <img className={styles.image} src={`${import.meta.env.VITE_API_BASE_URL}${imageUrl}`} alt="Uploaded" />
            </>
          )}
          <br />
          <br />
          <TextField
            value={title}
            onChange={handleTitleChange}
            classes={{ root: styles.title }}
            variant="standard"
            placeholder="Заголовок статьи..."
            fullWidth
          />
          <TextField
            value={tags}
            onChange={handleTagsChange}
            classes={{ root: styles.tags }}
            variant="standard"
            placeholder="Тэги"
            fullWidth />
          <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
          <div className={styles.buttons}>
            <Button size="large" variant="contained">
              Опубликовать
            </Button>
            <a href="/">
              <Button size="large">Отмена</Button>
            </a>
          </div>
        </Paper>
      </Container>;
    </>
  );
};