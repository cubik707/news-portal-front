import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from './side-block.tsx';
import { Tag } from '../types/tags.types.ts';

type TagsBlockProps = {
  items: Tag[];
  isLoading?: boolean;
  selectedTagId?: number | null;
  onTagClick?: (tagId: number) => void;
}

export const TagsBlock = ({
                            items,
                            isLoading = true,
                            selectedTagId = null,
                            onTagClick
                          }: TagsBlockProps) => {
  const handleClick = (tagId: number) => {
    if (onTagClick) {
      onTagClick(tagId);
    }
  };

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((tag, i) => (
          <ListItem
            key={isLoading ? i : tag.id}
            disablePadding
            sx={{
              mb: 1,
              backgroundColor: selectedTagId === tag?.id ? 'action.selected' : 'inherit',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <ListItemButton
              onClick={!isLoading && tag ? () => handleClick(tag.id) : undefined}
              disabled={isLoading}
              sx={{
                borderRadius: 2,
                '&.Mui-disabled': {
                  opacity: 1,
                  cursor: 'not-allowed'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {isLoading ? (
                  <Skeleton variant="circular" width={24} height={24} />
                ) : (
                  <TagIcon fontSize="small" />
                )}
              </ListItemIcon>
              {isLoading ? (
                <Skeleton width={120} />
              ) : (
                <ListItemText
                  primary={tag?.name || ''}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: selectedTagId === tag.id ? 600 : 'normal',
                      color: selectedTagId === tag.id ? 'primary.main' : 'text.primary'
                    }
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SideBlock>
  );
};