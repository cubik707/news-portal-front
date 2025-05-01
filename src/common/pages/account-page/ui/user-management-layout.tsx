import UserList from '../../../../features/user/ui/user-list/user-list.tsx';
import { UserRole } from '../../../../features/user/types/user-role.enum.ts';
import { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import {
  useApproveUserMutation,
  useAssignRoleMutation, useDeleteUserMutation,
  useGetUsersQuery, useRemoveRoleMutation,
} from '../../../../features/user/api/userApi.ts';
import { useAppDispatch } from '../../../hooks';
import { setAppError } from '../../../../app/app-slice.ts';

const USERS_PER_PAGE = 6;

const UserManagementLayout = () => {
  const { data, refetch } = useGetUsersQuery();
  const users = data?.data || [];
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const [approveUser] = useApproveUserMutation();
  const [assignRole] = useAssignRoleMutation();
  const [removeRole] = useRemoveRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleApprove = async (userId: number) => {
    try {
      await approveUser(userId).unwrap();
      await refetch();
    } catch (error: any) {
      const message =
        error?.data?.message || error?.error || 'Произошла ошибка при одобрении пользователя';
      dispatch(setAppError({ error: message }));
    }
  };

    const handleDisapprove = async (userId: number) => {
    try {
      await deleteUser(userId).unwrap();
      await refetch();
    } catch (error: any) {
      const message =
        error?.data?.message || error?.error || 'Произошла ошибка при удалении пользователя';
      dispatch(setAppError({ error: message }));
    }
  }

  const handleRoleChange = async (userId: number, role: UserRole, checked: boolean) => {
    try {
      if (checked) {
        await assignRole({ id: userId, role: { role } }).unwrap();
      } else {
        await removeRole({ id: userId, role: { role } }).unwrap();
      }
      await refetch(); // обновим список пользователей после изменения роли
    } catch (error: any) {
      const message =
        error?.data?.message || error?.error || 'Ошибка при изменении роли пользователя';
      dispatch(setAppError({ error: message }));
    }
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
        onDisapprove={handleDisapprove}
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
