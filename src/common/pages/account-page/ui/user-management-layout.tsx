import UserList from '../../../../features/user/ui/user-list/user-list.tsx';
import { User } from '../../../../features/user/types/user.types.ts';
import { UserRole } from '../../../../features/user/types/user-role.enum.ts';
import { useState } from 'react';
import { Pagination, Box } from '@mui/material';

const USERS_PER_PAGE = 6;

const initialUsers: User[] = [
  { id: 1, username: 'jdoe', email: 'jdoe@example.com', lastName: 'Doe', firstName: 'John', position: 'Developer', department: 'IT', roles: [UserRole.USER], approved: false },
  { id: 2, username: 'jdoe', email: 'jdoe@example.com', lastName: 'Doe', firstName: 'John', position: 'Developer', department: 'IT', roles: [UserRole.USER, UserRole.EDITOR], approved: true },
  { id: 3, username: 'jdoe', email: 'jdoe@example.com', lastName: 'Doe', firstName: 'John', position: 'Developer', department: 'IT', roles: [UserRole.USER, UserRole.ADMIN], approved: true },
  { id: 4, username: 'jdoe', email: 'jdoe@example.com', lastName: 'Doe', firstName: 'John', position: 'Developer', department: 'IT', roles: [UserRole.USER, UserRole.EDITOR], approved: true },
  { id: 5, username: 'jdoe', email: 'jdoe@example.com', lastName: 'Doe', firstName: 'John', position: 'Developer', department: 'IT', roles: [UserRole.USER], approved: true },
  { id: 6, username: 'jdoe', email: 'jdoe@example.com', lastName: 'Doe', firstName: 'John', position: 'Developer', department: 'IT', roles: [UserRole.USER], approved: true },
  { id: 7, username: 'jdoe', email: 'jdoe@example.com', lastName: 'Doe', firstName: 'John', position: 'Developer', department: 'IT', roles: [UserRole.USER], approved: true },
];

const UserManagementLayout = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [page, setPage] = useState<number>(1);

  const handleApprove = (userId: number) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, approved: !user.approved } : user
    ));
  };

  const handleRoleChange = (userId: number, role: UserRole, checked: boolean) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const roles = checked
          ? [...user.roles, role]
          : user.roles.filter(r => r !== role);
        return { ...user, roles };
      }
      return user;
    }));
  };

  const handlePageChange = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const paginatedUsers = users.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  const pageCount = Math.ceil(users.length / USERS_PER_PAGE);

  return (
    <>
      <UserList
        users={paginatedUsers}
        onApprove={handleApprove}
        onRoleChange={handleRoleChange}
      />
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};

export default UserManagementLayout;
