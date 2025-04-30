import { Box, Card, Divider, Typography } from '@mui/material';
import { UserProfileSkeleton } from './user-profile-skeleton.tsx';
import Avatar from '@mui/material/Avatar';
import { User } from '../../user/types/user.types.ts';
import { EditableSpan } from '../../../common/components/editable-span/editable-span.tsx';

type UserProfileProps = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean | undefined;
}

export const UserProfile = ({user, isLoading, isAdmin}: UserProfileProps) => {

  const handleSaveField = async (field: keyof User, value: string) => {
    // API call to save changes
    console.log(`Saving ${field}:`, value);
  };

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Профиль пользователя</Typography>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" alignItems="flex-start" gap={5}>
        <Avatar sx={{ width: 115, height: 115 }} />

        <Box
          sx={{
            '& > *': {
              display: "flex",
              alignItems:"center",
              gap: 1,
              height: '35px'
            },
            '& .MuiTypography-subtitle2': {
              fontWeight: 'bold'
            }
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle2">Фамилия:</Typography>
            <EditableSpan
              maxWidth={'250px'}
              value={`${user?.lastName}`}
              onChange={(v) => handleSaveField('lastName', v)}
              isAdmin={isAdmin}
            />
          </Box>
          <Box >
            <Typography variant="subtitle2">Имя:</Typography>
            <EditableSpan
              maxWidth={'250px'}
              value={`${user?.firstName}`}
              onChange={(v) => handleSaveField('firstName', v)}
              isAdmin={isAdmin}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Отчество:</Typography>
            <EditableSpan
              maxWidth={'250px'}
              value={`${user?.surname}`}
              onChange={(v) => handleSaveField('surname', v)}
              isAdmin={isAdmin}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Логин:</Typography>
            <EditableSpan
              maxWidth={'250px'}
              value={`${user?.username}`}
              onChange={(v) => handleSaveField('username', v)}
              isAdmin={isAdmin}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Почта:</Typography>
            <EditableSpan
              maxWidth={'250px'}
              value={`${user?.email}`}
              onChange={(v) => handleSaveField('email', v)}
              isAdmin={isAdmin}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Отдел:</Typography>
            <EditableSpan
              maxWidth={'250px'}
              value={`${user?.department}`}
              onChange={(v) => handleSaveField('department', v)}
              isAdmin={isAdmin}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Должность:</Typography>
            <EditableSpan
              maxWidth={'400px'}
              value={`${user?.position}`}
              onChange={(v) => handleSaveField('position', v)}
              isAdmin={isAdmin}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
