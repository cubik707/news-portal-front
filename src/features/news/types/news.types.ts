import { UserForNews } from '../../user/types/user.types.ts';
import { Tag } from '../../tags/types/tags.types.ts';
import { Category } from '../../category/types/category.types.ts';

export type News = {
  id: string;
  title: string;
  content: string;
  image: string;
  author: UserForNews;
  tags: Tag[];
  publishedAt: string;
  category: Category;
};

export type NewsCreate = {
  title: string;
  content: string;
  image: string;
  authorId: string;
  tags: string[];
  categoryId: string;
};

export type NewsUpdate = {
  id: string;
  title: string;
  content: string;
  image: string;
  authorId: string;
  tags: string[];
  categoryId: string;
};
