import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../app/app-slice.ts';
import { useVerifyTokenQuery } from '../features/auth/api/auth-api.ts';

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const isLoggedIn  = useSelector(selectIsLoggedIn);
  const {isError} = useVerifyTokenQuery();

  if (!isLoggedIn || isError) {
    return <Navigate to='/login' replace />;
  }

  return children;
};