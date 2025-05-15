import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewsPost from '../../../../features/news/ui/news-post/news-post.tsx';
import Box from '@mui/system/Box';
import Markdown from 'react-markdown';
import { Button, LinearProgress, TextField, Typography } from '@mui/material';
import { useGetOneNewsQuery } from '../../../../features/news/api/news-api.ts';

export const AdminNewsReview = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { data, isLoading: isNewsLoading } = useGetOneNewsQuery(Number(id!));
  const news = data?.data;

  // Заглушки для обработчиков
  const handleApprove = () => {
    console.log('Одобрено с комментарием:', comment);
    navigate('/admin/news');
  };

  const handleReject = () => {
    console.log('Отклонено с комментарием:', comment);
    navigate('/admin/news');
  };

  if (isNewsLoading) return <LinearProgress />;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <NewsPost
        id={news!.id}
        title={news!.title}
        image={`${import.meta.env.VITE_API_BASE_URL}${news!.image}`}
        author={news!.author}
        publishedAt={news!.publishedAt}
        tags={news!.tags}
        isFullPost
      >
        <Markdown>{news!.content}</Markdown>
      </NewsPost>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Модерация статьи
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Комментарий модератора"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleApprove}
            sx={{ px: 4 }}
          >
            Одобрить
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleReject}
            sx={{ px: 4 }}
          >
            Отклонить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};