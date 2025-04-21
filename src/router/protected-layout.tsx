import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../app/app-slice.ts';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};