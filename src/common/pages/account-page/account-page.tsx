import { AccountLayout } from './ui/account-layout.tsx';
import { Header } from '../../components/header/header.tsx';
import Box from '@mui/system/Box';


export const AccountPage = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1}}>
      <Header />
      <AccountLayout />
    </Box>
  );
};
