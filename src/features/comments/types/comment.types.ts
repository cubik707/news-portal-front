export type CommentAuthor = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
};

export type Comment = {
  id: string;
  content: string;
  author: CommentAuthor;
  newsId: string;
  news?: { id: string; title: string };
  createdAt: string;
  editedAt: string | null;
};
