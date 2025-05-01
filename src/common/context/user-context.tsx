import { createContext, useContext } from 'react';
import { User } from '../../features/user/types/user.types.ts';

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  error: unknown;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  error: null,
});


export const useUser = () => useContext(UserContext);