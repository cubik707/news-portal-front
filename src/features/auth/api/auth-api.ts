import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';
import { LoginArgs } from './auth-api.types.ts';
import { HttpMethod } from '../../../common/enums';
import { User } from '../../user/types/user.types.ts';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<SuccessResponse<{ token: string }>, LoginArgs>({
      query: payload => {
        return {
          method: HttpMethod.POST,
          url: '/auth',
          body: payload,
        };
      },
    }),
    verifyToken: builder.query<SuccessResponse, void>({
      query: () => ({
        method: HttpMethod.GET,
        url: '/verify-token',
      }),
    }),
    me: builder.query<SuccessResponse<User>, void>({
      query: () => '/me',
    }),
  }),
});

export const { useMeQuery, useVerifyTokenQuery, useLoginMutation } = authApi;