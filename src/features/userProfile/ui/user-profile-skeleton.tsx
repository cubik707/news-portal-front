import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Skeleton from '@mui/material/Skeleton';

export const UserProfileSkeleton = () => {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Профиль пользователя</Typography>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="50%" height={30} />
        <Skeleton variant="text" width="40%" height={30} />
        <Skeleton variant="text" width="45%" height={30} />
      </Box>
    </Card>
  );
};