import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};