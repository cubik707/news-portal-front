import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../app/App.tsx';
import { AuthWrapper } from './auth-wrapper.tsx';
import MainPage from '../pages/main-page/main-page.tsx';
import LoginPage from '../features/auth/ui/login/login-page.tsx';

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
        path: '/',
        element: (
          <AuthWrapper>
            <MainPage />
          </AuthWrapper>
        ),
      },
      {
        path: '*',
        element: <Navigate to='/' replace />,
  },
],
},
]);