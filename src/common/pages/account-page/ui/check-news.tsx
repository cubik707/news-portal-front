import { NewsSkeleton } from '../../../../features/news/ui/news-post/news-post-skeleton.tsx';
import { Box, Button } from '@mui/material';
import NewsPost from '../../../../features/news/ui/news-post/news-post.tsx';
import { useGetNewsByStatusQuery } from '../../../../features/news/api/news-api.ts';
import { NewsStatus } from '../../../../features/news/types/news-status.enum.ts';
import { useNavigate } from 'react-router-dom';

export const CheckNews = () => {
  const { data, isLoading: isNewsLoading } = useGetNewsByStatusQuery(NewsStatus.draft);
  const newsList = data?.data || [];
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
      {(isNewsLoading ? Array(5).fill(null) : newsList).map((news, index) =>
        isNewsLoading ? (
          <NewsSkeleton key={index} />
        ) : (
          <Box key={news.id} sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'relative',
            border: '1px solid #eee',
            p: 3,
            borderRadius: 2
          }}>
            <NewsPost
              id={news.id}
              title={news.title}
              image={`${import.meta.env.VITE_API_BASE_URL}${news.image}`}
              author={news.author}
              publishedAt={news.publishedAt}
              tags={news.tags}
            />
            <Button
              variant="contained"
              onClick={() => navigate(`/account/admin/news/${news.id}`)}
              sx={{ alignSelf: 'flex-start' }}
            >
              Проверить статью
            </Button>
          </Box>
        )
      )}
    </Box>
  );
};
