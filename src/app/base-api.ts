import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authTokenManager } from '../features/auth/lib/auth-token-manager.ts';
import { setIsLoggedIn } from './app-slice.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = authTokenManager.getAccessToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    api.dispatch(setIsLoggedIn({ isLoggedIn: false }));
    authTokenManager.removeAccessToken()
  }
  return result;
};


export const baseApi = createApi({
  reducerPath: 'newsPortalAPI',
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ['News'],
})

