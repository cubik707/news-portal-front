import styles from "./side-block.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ReactNode } from 'react';

type SideBlockProps = {
  title: string;
  children: ReactNode;
}

export const SideBlock = ({ title, children }: SideBlockProps) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};