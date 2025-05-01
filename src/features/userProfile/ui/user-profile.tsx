import { Box, Card, Divider, Typography } from '@mui/material';
import { UserProfileSkeleton } from './user-profile-skeleton.tsx';
import Avatar from '@mui/material/Avatar';
import { User, UserFieldObject } from '../../user/types/user.types.ts';
import { EditableSpan } from '../../../common/components/editable-span/editable-span.tsx';
import { useUpdateUserFieldMutation } from '../../user/api/userApi.ts';
import { useAuthUser } from '../../../common/hooks/useAuthUser.ts';
import { setAppError } from '../../../app/app-slice.ts';
import { useAppDispatch } from '../../../common/hooks';

type UserProfileProps = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean | undefined;
}

export const UserProfile = ({user, isLoading, isAdmin}: UserProfileProps) => {
  const [updateUserField] = useUpdateUserFieldMutation();
  const { refetch } = useAuthUser();
  const dispatch = useAppDispatch();

  const handleSaveField = async (field: keyof UserFieldObject, value: string) => {
    if (!user) return;
    const userFiled = {[field]: value}

    try {
      await updateUserField({ id: user.id, userFiled }).unwrap();
      await refetch();
    } catch (error: any) {
      const message =
        error?.data?.message || error?.error || 'Произошла ошибка при обновлении пользователя';
      dispatch(setAppError({ error: message }));
    }
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
