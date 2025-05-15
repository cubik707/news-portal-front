  import clsx from 'clsx';
  import IconButton from '@mui/material/IconButton';
  import DeleteIcon from '@mui/icons-material/Clear';
  import EditIcon from '@mui/icons-material/Edit';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

  import styles from './news.module.scss';
  import { ReactNode, useCallback } from 'react';
  import { UserInfo } from '../../../user/ui/user-info/user-info.tsx';
  import { News } from '../../types/news.types.ts';
  import { Link } from 'react-router-dom';
  import { useDeleteNewsMutation } from '../../api/news-api.ts';
  import { setAppError } from '../../../../app/app-slice.ts';
  import { useAppDispatch } from '../../../../common/hooks';

  type NewsProps = Omit<News, 'content' | 'category'> & {
    likesCount?: number;
    commentsCount?: number;
    children?: ReactNode;
    isFullPost?: boolean;
    isEditable?: boolean;
    isDraft?: boolean;
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
                      isDraft,
                    }: NewsProps) => {

    const [deleteNews] = useDeleteNewsMutation();
    const dispatch = useAppDispatch();

    const onClickRemove = useCallback(async () => {
      try {
        await deleteNews(id).unwrap();
      } catch (error: any) {
        const message =
          error?.data?.message || error?.error || 'Произошла ошибка при удалении новости';
        dispatch(setAppError({ error: message }));
      }
    }, [deleteNews]);

    return (
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        {isEditable && (
          <div className={styles.editButtons}>
            <Link to={`/posts/${id}/edit`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
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
              {isFullPost ? title : (isDraft ?
                <Link to={`/news/${id}/edit`}>{title}</Link> :
                <Link to={`/news/${id}`}>{title}</Link>)}
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
              {likesCount && (<li>
                <FavoriteIcon />
                <span>{likesCount}</span>
              </li>)}
              {commentsCount && (<li>
                <CommentIcon />
                <span>{commentsCount}</span>
              </li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  export default NewsPost;