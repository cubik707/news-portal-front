import Typography from '@mui/material/Typography';
import { useUser } from '../../../../common/context/user-context.tsx';
import { CommentsBlock } from '../../../../features/comments/ui/comments-block/comments-block.tsx';
import {
  useGetMyCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '../../../../features/comments/api/comments-api.ts';

export const MyCommentsLayout = () => {
  const { user } = useUser();
  const { data, isLoading, isError } = useGetMyCommentsQuery();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const comments = data?.data ?? [];

  const handleEdit = (commentId: string, newText: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;
    updateComment({ id: commentId, content: newText, newsId: comment.newsId });
  };

  const handleDelete = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;
    deleteComment({ id: commentId, newsId: comment.newsId });
  };

  const emptyState =
    !isLoading && !isError && comments.length === 0 ? (
      <Typography variant="body2" color="text.secondary" sx={{ px: 2, pb: 2 }}>
        У вас пока нет комментариев
      </Typography>
    ) : null;

  const errorState = isError ? (
    <Typography variant="body2" color="error" sx={{ px: 2, pb: 2 }}>
      Не удалось загрузить комментарии. Попробуйте обновить страницу.
    </Typography>
  ) : null;

  return (
    <CommentsBlock
      items={comments}
      isLoading={isLoading}
      currentUserId={user?.id}
      showNewsContext
      onEditComment={handleEdit}
      onDeleteComment={handleDelete}
    >
      {errorState}
      {emptyState}
    </CommentsBlock>
  );
};
