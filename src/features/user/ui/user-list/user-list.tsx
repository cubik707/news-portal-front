import { UserRole } from '../../types/user-role.enum.ts';
import { User } from '../../types/user.types.ts';
import React from 'react';
import { Grid } from '@mui/material';
import { UserCard } from '../user-card/user-card.tsx';


interface UserListProps {
  users: User[];
  onApprove: (userId: number) => void;
  onDisapprove: (userId: number) => void;
  onRoleChange: (userId: number, role: UserRole, checked: boolean) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onApprove, onDisapprove, onRoleChange }) => {
  return (
    <Grid container spacing={3}>
      {users.map((user) => (
        <Grid size={{ xs: 12, md: 4, sm: 6 }} key={user.id}>
          <UserCard
            user={user}
            onApprove={onApprove}
            onDisapprove={onDisapprove}
            onRoleChange={onRoleChange}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;