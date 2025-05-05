import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './news.module.scss';
import { ReactNode } from 'react';
import { UserInfo } from '../../user/ui/user-info/user-info.tsx';
import { News } from '../types/news.types.ts';

type NewsProps = Omit<News, "content" | "category"> & {
  likesCount: number;
  commentsCount: number;
  children?: ReactNode;
  isFullPost?: boolean;
  isEditable?: boolean;
}

const NewsPost = ({
                id,
                title,
                publishedAt,
                image,
                author,
                likesCount,
                commentsCount,
                tags,
                children,
                isFullPost,
                isEditable,
              }: NewsProps) => {

  const onClickRemove = () => {};

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <a href={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {image && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={image}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...author} additionalText={publishedAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <a href={`/posts/${id}`}>{title}</a>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag.id}>
                <a href={`/tag/${tag.name}`}>#{tag.name}</a>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <FavoriteIcon />
              <span>{likesCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsPost;