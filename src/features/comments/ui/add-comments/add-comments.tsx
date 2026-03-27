import styles from './add-comments.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useUser } from '../../../../common/context/user-context.tsx';
import { useCreateCommentMutation } from '../../api/comments-api.ts';

type AddCommentsProps = {
  newsId: string;
};

export const AddComments = ({ newsId }: AddCommentsProps) => {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await createComment({ newsId, content });
    setContent('');
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${import.meta.env.VITE_API_BASE_URL}${user!.avatarUrl}`}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={content}
            onChange={e => setContent(e.target.value)}
            inputProps={{ maxLength: 2000 }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading || !content.trim()}
          >
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
