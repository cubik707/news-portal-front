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
}

export const TagsBlock = ({ items, isLoading = true }: TagsBlockProps) => {
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((tag, i) => (
          <a
            key={isLoading ? i : tag.id}
            style={{ textDecoration: "none", color: "black" }}
            href={`/tags/${tag?.name || ''}`}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={tag?.name || ''} />
                )}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  );
};