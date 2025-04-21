import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../app/App.tsx';
import MainPage from '../pages/main-page/main-page.tsx';
import LoginPage from '../features/auth/ui/login/login-page.tsx';
import { ProtectedLayout } from './protected-layout.tsx';

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