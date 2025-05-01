import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../app/app-slice.ts';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

/*
interface ProtectedLayoutProps {
  children: ReactNode;
}
*/

export const ProtectedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>;
};