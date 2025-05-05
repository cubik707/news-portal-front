import { UserForNews } from '../../user/types/user.types.ts';
import { Tag } from '../../tags/types/tags.types.ts';
import { Category } from '../../category/types/category.types.ts';

export type News = {
  id: number,
  title: string,
  content: string,
  image: string,
  author: UserForNews,
  tags: Tag[],
  publishedAt: string,
  category: Category,
}

export type NewsCreate = {
  title: string,
  content: string,
  image: string,
  authorId: number,
  tags: string[],
  categoryId: number,
}