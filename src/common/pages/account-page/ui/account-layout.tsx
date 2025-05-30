import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar.tsx';


export const AccountLayout = () => {

  return (
    <Box display="flex" sx={{
      position: 'relative',
      zIndex: 1,
      minHeight: '100vh', // Заменили фиксированную высоту на минимальную
      flexGrow: 1,
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
