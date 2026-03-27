import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { Fragment, ReactNode, useState } from 'react';
import { SideBlock } from '../../../tags/ui/side-block.tsx';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Clear';
import { Button, TextField, Typography } from '@mui/material';
import { Comment } from '../../types/comment.types.ts';

type CommentsBlockProps = {
  items: Comment[];
  children?: ReactNode;
  isLoading?: boolean;
  currentUserId?: string;
  isAdmin?: boolean;
  onEditComment?: (commentId: string, newText: string) => void;
  onDeleteComment?: (commentId: string) => void;
};

export const CommentsBlock = ({
  items,
  children,
  isLoading = true,
  currentUserId,
  isAdmin = false,
  onEditComment,
  onDeleteComment,
}: CommentsBlockProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  const handleStartEdit = (commentId: string, initialText: string) => {
    setEditingCommentId(commentId);
    setEditedText(initialText);
  };

  const handleSaveEdit = () => {
    if (editingCommentId && editedText.trim()) {
      onEditComment?.(editingCommentId, editedText);
      setEditingCommentId(null);
      setEditedText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedText('');
  };

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <Fragment key={isLoading ? index : obj.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={`${obj.author.firstName} ${obj.author.lastName}`} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  {editingCommentId === obj.id ? (
                    <div style={{ flexGrow: 1, marginRight: 16 }}>
                      <TextField
                        value={editedText}
                        onChange={e => setEditedText(e.target.value)}
                        fullWidth
                        multiline
                        variant="outlined"
                      />
                      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                        <Button variant="contained" size="small" onClick={handleSaveEdit}>
                          Сохранить
                        </Button>
                        <Button variant="outlined" size="small" onClick={handleCancelEdit}>
                          Отмена
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ListItemText
                        primary={`${obj.author.firstName} ${obj.author.lastName}`}
                        secondary={
                          <>
                            {obj.content}
                            {obj.editedAt && (
                              <Typography
                                component="span"
                                variant="caption"
                                color="text.secondary"
                                sx={{ ml: 1 }}
                              >
                                (изменено)
                              </Typography>
                            )}
                          </>
                        }
                        style={{ flexGrow: 1 }}
                      />
                      <div style={{ display: 'flex', marginLeft: 16 }}>
                        {obj.author.id === currentUserId && (
                          <IconButton
                            onClick={() => handleStartEdit(obj.id, obj.content)}
                            size="small"
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                        {(obj.author.id === currentUserId || isAdmin) && (
                          <IconButton
                            onClick={() => onDeleteComment?.(obj.id)}
                            size="small"
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
