import { CommentsBlock } from '../../../../features/comments/ui/comments-block/comments-block.tsx';

export const MyCommentsLayout = () => {
  const handleEdit = (commentId: string, newText: string) => {
    console.log('Редактировать комментарий:', commentId, 'Новый текст:', newText);
  };

  const handleDelete = (commentId: string) => {
    console.log('Удалить комментарий:', commentId);
  };


  return (
    <CommentsBlock
      items={[
        {
          id: '1',
          user: {
            fullName: 'Владислава Демидовец',
            avatarUrl: '',
          },
          text: 'Вау! Так необычно!!!',
        },
      ]}
      isLoading={false}
      isEditable
      onEditComment={handleEdit}
      onDeleteComment={handleDelete}
    />
  );
};