import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar.tsx';


export const AccountLayout = () => {

  return (
    <Box display="flex" sx={{
      position: 'relative',
      zIndex: 1,
      height: 'calc(100vh - var(--header-height))',
    }}>
      <Sidebar />
      <Box component="main" sx={{
        flexGrow: 1,
        px: 0,
        py: 4,

      }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>

  );
};
