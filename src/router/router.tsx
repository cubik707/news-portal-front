import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../app/App.tsx';
import MainPage from '../pages/main-page/main-page.tsx';
import LoginPage from '../features/auth/ui/login/login-page.tsx';
import { ProtectedLayout } from './protected-layout.tsx';
import RegisterPage from '../features/auth/ui/register/register-page.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage/>
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: '/',
            element: <MainPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);