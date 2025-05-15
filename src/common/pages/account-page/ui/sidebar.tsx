import { Box, Drawer, List, ListItemButton, ListItemText, Skeleton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserRole } from '../../../../features/user/types/user-role.enum.ts';
import { useUser } from '../../../context/user-context.tsx';

const menuItems = [
  { label: 'Мой профиль', path: '/account/profile' },
  { label: 'Мои комментарии', path: '/account/comments' },
  { label: 'Управление пользователями', path: '/account/admin/users', adminOnly: true },
  { label: 'Рассмотрение заявок пользователей', path: '/account/admin/аmendment', adminOnly: true },
  { label: 'Рассмотрение статьей', path: '/account/admin/news', adminOnly: true },
  { label: 'Черновики статей', path: '/account/editor/drafted-news', editorOnly: true },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useUser();

  const isAdmin = user?.roles.includes(UserRole.ADMIN);
  const isEditor = user?.roles.includes(UserRole.EDITOR);

  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton width="60%" />
      </Box>
    );
  }

  return (
    <Drawer variant="permanent" sx={{
      width: 240,
      flexShrink: 0,
      zIndex: 1000,
      minHeight: '100vh',
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        position: 'relative',
        overflowX: 'hidden',
      },
    }}>
      <Box sx={{ width: 240, py: 4 }}>
        <List>
          {menuItems
            .filter(item => !item.adminOnly || isAdmin)
            .filter(item => !item.editorOnly || isEditor)
            .map(item => (
              <ListItemButton
                key={item.path}
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemText sx={{px: 2}} primary={item.label} />
              </ListItemButton>
            ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;