import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import NewsPost from '../../../features/news/ui';
import { TagsBlock } from '../../../features/tags/ui/tags-block.tsx';
import { CommentsBlock } from '../../../features/comments/ui/comments-block.tsx';
import { Container } from '@mui/material';
import { Header } from '../../components/header/header.tsx';
import { useGetNewsByStatusQuery } from '../../../features/news/api/news-api.ts';
import { NewsStatus } from '../../../features/news/types/news-status.enum.ts';

const MainPage = () => {
  const {data, isLoading} = useGetNewsByStatusQuery(NewsStatus.published);
  const newsList = data?.data || [];

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
          <Tab label="Новые" />
          <Tab label="Популярные" />
        </Tabs>
        <Grid container spacing={4}>
          <Grid size={{ xs: 8 }}>
            {newsList.map((news) => (
              <NewsPost
                id={news.id}
                title={news.title}
                image={`${import.meta.env.VITE_API_BASE_URL}${news.image}`}
                author={news.author}
                publishedAt={news.publishedAt}
                likesCount={150}
                commentsCount={3}
                tags={news.tags}
                isEditable
                isLoading={isLoading}
              />
            ))}
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: 'Вася Пупкин',
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  },
                  text: 'Это тестовый комментарий',
                },
                {
                  user: {
                    fullName: 'Иван Иванов',
                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                  },
                  text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                },
              ]}
              isLoading={false}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;