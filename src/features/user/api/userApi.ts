import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';
import { User, UserFieldObject } from '../types/user.types.ts';
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
    })
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserFieldMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi