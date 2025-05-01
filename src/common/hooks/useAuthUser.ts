import { useMeQuery } from '../../features/auth/api/auth-api.ts';

export const useAuthUser = () => {
  return useMeQuery();
};