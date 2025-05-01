// AdminUserPanel.tsx
import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { User, UserFieldObject } from '../../types/user.types.ts';
import { UserRole } from '../../types/user-role.enum.ts';
import { EditableSpan } from '../../../../common/components/editable-span/editable-span.tsx';
import { useGetUsersQuery, useUpdateUserFieldMutation } from '../../api/userApi.ts';
import { useAppDispatch } from '../../../../common/hooks';
import { setAppError } from '../../../../app/app-slice.ts';


interface UserCardProps {
  user: User;
  onApprove: (userId: number) => void;
  onDisapprove: (userId: number) => void;
  onRoleChange: (userId: number, role: UserRole, checked: boolean) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onApprove, onDisapprove, onRoleChange }) => {
  const [updateUserField] = useUpdateUserFieldMutation();
  const {refetch} = useGetUsersQuery()
  const dispatch = useAppDispatch();

  const handleSaveField = async (field: keyof UserFieldObject, value: string) => {
    if (!user) return;
    const userFiled = { [field]: value };

    try {
      await updateUserField({ id: user.id, userFiled }).unwrap();
      await refetch();
    } catch (error: any) {
      const message =
        error?.data?.message || error?.error || 'Произошла ошибка при обновлении пользователя';
      dispatch(setAppError({ error: message }));
    }
  };

  const handleRoleToggle = (role: UserRole) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (role !== UserRole.USER) {
      onRoleChange(user.id, role, e.target.checked);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 115, height: 115 }} />
        }
        title={
          <Box
            display="flex"
            flexDirection="column"
            alignItems="baseline"
            sx={{
              '& .MuiTypography-body1': {
                fontSize: '0.875rem',
              },
              '& * ': {
                minHeight: '20px !important',
              },
            }}
          >

            <EditableSpan
              value={user.lastName}
              onChange={(v) => handleSaveField('lastName', v)}
              isAdmin={true}
              max-width={'40px'}
            />
            <EditableSpan
              value={user.firstName}
              onChange={(v) => handleSaveField('firstName', v)}
              isAdmin={true}
            />
            <EditableSpan
              value={user.surname || ''}
              onChange={(v) => handleSaveField('surname', v)}
              isAdmin={true}
            />
          </Box>
        }
        subheader={
          <Box sx={{
            mt: 0.5,
            '& .MuiTypography-root': {
              color: 'text.secondary',
              fontSize: '0.875rem',
            },
          }}>
            <EditableSpan
              value={user.position}
              onChange={(v) => handleSaveField('position', v)}
              isAdmin={true} />
          </Box>
        }
      />
      <CardContent>
        <Box sx={{
          '& > *': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            height: '35px',
          },
          '& > * > .MuiTypography-body1': {
            fontWeight: 'bold',
          },
        }}>
          <Box>
            <Typography variant="body1"> Логин: </Typography>
            <EditableSpan
              maxWidth={'250px'}
              value={`${user?.username}`}
              onChange={(v) => handleSaveField('username', v)}
              isAdmin={true}
            />
          </Box>
          <Box>
            <Typography variant="body1"> Email: </Typography>
            <EditableSpan
              maxWidth={'250px'}
              value={`${user?.email}`}
              onChange={(v) => handleSaveField('email', v)}
              isAdmin={true}
            />
          </Box>
          <Box>
            <Typography variant="body1"> Отдел: </Typography>
            <EditableSpan
              maxWidth={'250px'}
              value={`${user?.department}`}
              onChange={(v) => handleSaveField('department', v)}
              isAdmin={true}
            />
          </Box>
        </Box>

        <FormGroup sx={{ mt: 2 }}>
          <Typography variant="subtitle1"> <strong>Роли:</strong> </Typography>
          {Object.values(UserRole).map((role) => (
            <FormControlLabel
              key={role}
              control={
                <Checkbox
                  checked={user.roles.includes(role)}
                  onChange={handleRoleToggle(role)}
                  disabled={role === UserRole.USER}
                />
              }
              label={role}
            />
          ))}
        </FormGroup>

        {user.approved ? (
          <Button
            color={'error'}
            onClick={() => onDisapprove(user.id)}
            sx={{
              mt: 2,
              textTransform: 'none',
              px: 3,
              borderWidth: 2,
              '&:hover': { borderWidth: 2 },
            }}
            variant="outlined"
          >
            Отозвать одобрение
          </Button>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              color={'primary'}
              onClick={() => onApprove(user.id)}
              sx={{
                mt: 2,
                textTransform: 'none',
                px: 3,
                borderWidth: 2,
                '&:hover': { borderWidth: 2 },
              }}
              variant="outlined"
            >
              Одобрить
            </Button>
            <Button
              color={'error'}
              onClick={() => onDisapprove(user.id)}
              sx={{
                mt: 2,
                textTransform: 'none',
                px: 3,
                borderWidth: 2,
                '&:hover': { borderWidth: 2 },
              }}
              variant="outlined"
            >
              Отклонить
            </Button>
          </Box>
        )
        }


      </CardContent>
    </Card>
  );
};
