import { useGetNewsByStatusAndAuthorIdQuery } from '../../../../features/news/api/news-api.ts';
import { NewsStatus } from '../../../../features/news/types/news-status.enum.ts';
import { NewsSkeleton } from '../../../../features/news/ui/news-post/news-post-skeleton.tsx';
import NewsPost from '../../../../features/news/ui/news-post/news-post.tsx';
import { Box, Button, Typography } from '@mui/material';
import { useUser } from '../../../context/user-context.tsx';

export const DraftedNewsLayout = () => {
  const { user } = useUser();
  const { data, isLoading: isNewsLoading } = useGetNewsByStatusAndAuthorIdQuery({
    status: NewsStatus.draft,
    authorId: user!.id,
  });

  // Временные заглушки для демонстрации
  const mockAdminComments = [
    { comment: "Ваша новость одобрена администратором", approved: true },
    { comment: "Пожалуйста, добавьте более качественные фото", approved: false }
  ];

  const newsList = data?.data?.map((news, index) => ({
    ...news,
    adminComment: mockAdminComments[index % 2].comment,
    isApproved: mockAdminComments[index % 2].approved
  })) ?? [];

  return (
    <Box sx={{
      display: 'flex',
      gap: 8,
      flexDirection: 'column',
    }}>
      {(isNewsLoading ? Array(5).fill(null) : newsList).map((news, index) =>
        isNewsLoading ? (
          <NewsSkeleton key={index} />
        ) : (
          <Box key={news.id} sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'relative'
          }}>
            <NewsPost
              id={news.id}
              title={news.title}
              image={`${import.meta.env.VITE_API_BASE_URL}${news.image}`}
              author={news.author}
              publishedAt={news.publishedAt}
              tags={news.tags}
              isEditable={user?.id === news.author.id}
              isDraft
            />

            {/* Блок с комментарием администратора и кнопкой */}
            <Box sx={{
              p: 3,
              border: '2px solid',
              borderColor: news.isApproved ? 'success.light' : 'error.light',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              boxShadow: 1
            }}>
              <Typography
                variant="body1"
                color={news.isApproved ? 'success.dark' : 'error.dark'}
                sx={{ flexGrow: 1 }}
              >
                {news.adminComment}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                disabled={!news.isApproved}
                onClick={() => console.log('Публикация новости:', news.id)}
                sx={{ minWidth: 140 }}
              >
                Опубликовать
              </Button>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};