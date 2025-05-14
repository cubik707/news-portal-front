import { useGetNewsByStatusAndAuthorIdQuery } from '../../../../features/news/api/news-api.ts';
import { NewsStatus } from '../../../../features/news/types/news-status.enum.ts';
import { NewsSkeleton } from '../../../../features/news/ui/news-post/news-post-skeleton.tsx';
import NewsPost from '../../../../features/news/ui/news-post/news-post.tsx';
import { Box } from '@mui/material';
import { useUser } from '../../../context/user-context.tsx';
import { News } from '../../../../features/news/types/news.types.ts';

export const DraftedNewsLayout = () => {
  const { user } = useUser();
  const { data, isLoading: isNewsLoading } = useGetNewsByStatusAndAuthorIdQuery({
    status: NewsStatus.draft,
    authorId: user!.id,
  });
  const newsList = data?.data ?? [];

  return (
    <>
      <Box sx={{
        display: 'flex',
        gap: 8,
        flexDirection: 'column',
      }}>
        {(isNewsLoading ? Array(5).fill(null) : newsList).map((news: News, index) =>
          isNewsLoading ? (
            <NewsSkeleton key={index} />
          ) : (
            <NewsPost
              key={news.id}
              id={news.id}
              title={news.title}
              image={`${import.meta.env.VITE_API_BASE_URL}${news.image}`}
              author={news.author}
              publishedAt={news.publishedAt}
              tags={news.tags}
              isEditable={user?.id === news.author.id}
            />
          ),
        )}
      </Box>
    </>
  );
};