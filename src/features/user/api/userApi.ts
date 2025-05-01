import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';
import { RoleObj, User, UserFieldObject } from '../types/user.types.ts';
import { HttpMethod } from '../../../common/enums';


export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<SuccessResponse<User[]>, void>({
      query: () => 'users',
    }),
    updateUser: builder.mutation<SuccessResponse<User>, {id: number, user: User}>({
      query: ({id, user}) => ({
        method: HttpMethod.PUT,
        url: `users/${id}`,
        body: user
      }),
    }),
    updateUserField: builder.mutation<void, {id:number, userFiled: UserFieldObject}>({
      query: ({id, userFiled}) => ({
        method: HttpMethod.PATCH,
        url: `users/${id}`,
        body: userFiled
      })
    }),
    deleteUser: builder.mutation<SuccessResponse<null>, number>({
      query: (id) => ({
        method: HttpMethod.DELETE,
        url: `users/${id}`,
      })
    }),
    approveUser: builder.mutation<SuccessResponse<User>, number>({
      query: (id) => ({
        method: HttpMethod.PATCH,
        url: `/users/${id}/approve`,
      })
    }),
    assignRole: builder.mutation<SuccessResponse<User>, {id: number, role: RoleObj}> ({
      query: ({ id, role }) => ({
        method: HttpMethod.PATCH,
        url: `/users/${id}/roles`,
        body: role
      })
    }),
    removeRole: builder.mutation<SuccessResponse<User>, {id: number, role: RoleObj}>({
      query: ({ id, role }) => ({
        method: HttpMethod.DELETE,
        url: `/users/${id}/roles`,
        body: role,
      }),
    }),
  }),
});

  export const {
    useGetUsersQuery,
    useUpdateUserFieldMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useApproveUserMutation,
    useAssignRoleMutation,
    useRemoveRoleMutation,
  } = userApi;
