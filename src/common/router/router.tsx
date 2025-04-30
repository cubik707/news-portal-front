import { createBrowserRouter } from 'react-router-dom';
import App from '../../app/App.tsx';
import MainPage from '../pages/main-page/main-page.tsx';
import LoginPage from '../../features/auth/ui/login/login-page.tsx';
import { ProtectedLayout } from './protected-layout.tsx';
import RegisterPage from '../../features/auth/ui/register/register-page.tsx';
import { Page404 } from '../pages/page-404/page-404.tsx';
import { AccountPage } from '../pages/account-page/account-page.tsx';
import ProfileLayout from '../pages/account-page/ui/profile-layout.tsx';

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
        element: <RegisterPage />,
      },
      {
        element: <ProtectedLayout/>,
        children: [
          {
            index: true,
            element: <MainPage />
          },
          {
            path: 'account',
            element: <AccountPage/>,
            children: [
              {
                path: 'profile',
                element: <ProfileLayout/>
              }
            ]
          },
        ]
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);