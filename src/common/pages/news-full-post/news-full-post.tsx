import NewsPost from '../../../features/news/ui/news-post/news-post.tsx';
import { CommentsBlock } from '../../../features/comments/ui/comments-block/comments-block.tsx';
import { AddComments } from '../../../features/comments/ui/add-comments/add-comments.tsx';
import { Container } from '@mui/material';
import { Header } from '../../components/header/header.tsx';
import { useGetOneNewsQuery } from '../../../features/news/api/news-api.ts';
import { useParams } from 'react-router-dom';
import { NewsSkeleton } from '../../../features/news/ui/news-post/news-post-skeleton.tsx';
import Markdown from 'react-markdown';
import {
  useGetCommentsByNewsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '../../../features/comments/api/comments-api.ts';
import { useUser } from '../../context/user-context.tsx';
import { UserRole } from '../../../features/user/types/user-role.enum.ts';

export const NewsFullPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetOneNewsQuery(id!);
  const {
    data: commentsData,
    isLoading: commentsLoading,
    isUninitialized: commentsUninitialized,
  } = useGetCommentsByNewsQuery(id!);
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const { user } = useUser();

  const news = data?.data;
  const comments = commentsData?.data ?? [];
  const isAdmin = user?.roles.includes(UserRole.ADMIN) ?? false;

  if (isLoading) {
    return <NewsSkeleton />;
  }

  if (error) {
    return <div>Ошибка при загрузке новости</div>;
  }

  const handleEditComment = (commentId: string, newText: string) => {
    updateComment({ id: commentId, content: newText, newsId: id! });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment({ id: commentId, newsId: id! });
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 2 }}>
        <NewsPost
          id={news!.id}
          title={news!.title}
          image={`${import.meta.env.VITE_API_BASE_URL}/${news!.image}`}
          author={news!.author}
          publishedAt={news!.publishedAt}
          likesCount={150}
          commentsCount={comments.length}
          tags={news!.tags}
          isFullPost
        >
          <Markdown>{news!.content}</Markdown>
        </NewsPost>
        <CommentsBlock
          items={comments}
          isLoading={commentsLoading}
          currentUserId={user?.id}
          isAdmin={isAdmin}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
        >
          <AddComments newsId={id!} />
        </CommentsBlock>
      </Container>
    </>
  );
};
