import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../app/app-slice.ts';
import { useVerifyTokenQuery } from '../features/auth/api/auth-api.ts';

interface AuthWrapperProps {
  children: ReactNode;
  shouldRedirectIfLoggedIn?: boolean;
}

export const AuthWrapper = ({ children, shouldRedirectIfLoggedIn = true }: AuthWrapperProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isError, isLoading } = useVerifyTokenQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!isLoggedIn || isError) {
    return shouldRedirectIfLoggedIn ? <Navigate to="/login" replace /> : children;
  }

  // Если пользователь авторизован, но находится на /login — редирект на главную
  if (!shouldRedirectIfLoggedIn && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};