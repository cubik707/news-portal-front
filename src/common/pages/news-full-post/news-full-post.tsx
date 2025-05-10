import NewsPost from '../../../features/news/ui/news-post/news-post.tsx';
import { CommentsBlock } from '../../../features/comments/ui/comments-block/comments-block.tsx';
import { AddComments } from '../../../features/comments/ui/add-comments/add-comments.tsx';
import { Container } from '@mui/material';
import { Header } from '../../components/header/header.tsx';
import { useGetOneNewsQuery } from '../../../features/news/api/news-api.ts';
import { useParams } from 'react-router-dom';
import { NewsSkeleton } from '../../../features/news/ui/news-post/news-post-skeleton.tsx';
import Markdown from 'react-markdown';


export const NewsFullPost = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOneNewsQuery(Number(id));
  const news = data?.data;

  if(isLoading){
    return <NewsSkeleton />;
  }

  if (error) {
    return <div>Ошибка при загрузке новости</div>;
  }


  return (
    <>
      <Header />
      <Container sx={{ marginTop: 2 }}>
        <NewsPost
          id={news!.id}
          title={news!.title}
          image={`${import.meta.env.VITE_API_BASE_URL}${news!.image}`}
          author={news!.author}
          publishedAt={news!.publishedAt}
          likesCount={150}
          commentsCount={3}
          tags={news!.tags}
          isFullPost
        >
          <Markdown>{news!.content}</Markdown>
        </NewsPost>
        <CommentsBlock
          items={[
            {
              user: {
                fullName: 'Вася Пупкин',
                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
              },
              text: 'Это тестовый комментарий 555555',
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
        >
          <AddComments />
        </CommentsBlock>
      </Container>
    </>
  );
};