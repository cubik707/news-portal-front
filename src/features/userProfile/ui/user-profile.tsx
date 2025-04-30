import { Box, Card, Divider, Typography } from '@mui/material';
import { useMeQuery } from '../../auth/api/auth-api.ts';
import { UserProfileSkeleton } from './user-profile-skeleton.tsx';
import Avatar from '@mui/material/Avatar';

export const UserProfile = () => {
  const { data, isLoading } = useMeQuery();
  const user = data?.data;

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Профиль пользователя</Typography>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" alignItems="flex-start" gap={3}>
        <Avatar sx={{ width: 115, height: 115 }} />

        <Box>
          <Typography><strong>ФИО:</strong> {user?.lastName} {user?.firstName} {user?.surname}</Typography>
          <Typography><strong>Логин:</strong> {user?.username}</Typography>
          <Typography><strong>Email:</strong> {user?.email}</Typography>
          <Typography><strong>Отдел:</strong> {user?.department}</Typography>
          <Typography><strong>Должность:</strong> {user?.position}</Typography>
        </Box>
      </Box>
    </Card>
  );
};
