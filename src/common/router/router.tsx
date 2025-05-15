import { createBrowserRouter } from 'react-router-dom';
import App from '../../app/App.tsx';
import MainPage from '../pages/main-page/main-page.tsx';
import LoginPage from '../../features/auth/ui/login/login-page.tsx';
import { ProtectedLayout } from './protected-layout.tsx';
import RegisterPage from '../../features/auth/ui/register/register-page.tsx';
import { Page404 } from '../pages/page-404/page-404.tsx';
import { AccountPage } from '../pages/account-page/account-page.tsx';
import ProfileLayout from '../pages/account-page/ui/profile-layout.tsx';
import UserManagementLayout from '../pages/account-page/ui/user-management-layout.tsx';
import { NewsFullPost } from '../pages/news-full-post/news-full-post.tsx';
import { AddNewsPost } from '../pages/add-news-post/add-news-post.tsx';
import { DraftedNewsLayout } from '../pages/account-page/ui/drafted-news-layout.tsx';
import { MyCommentsLayout } from '../pages/account-page/ui/my-comments-layout.tsx';
import { EditNewsPost } from '../pages/account-page/edit-news-post/edit-news-post.tsx';
import { CheckNews } from '../pages/account-page/ui/check-news.tsx';
import { AdminNewsReview } from '../pages/account-page/ui/admin-news-review.tsx';

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
            path: 'news/:id',
            element: <NewsFullPost/>
          },
          {
            path: 'news/:id/edit',
            element: <EditNewsPost/>
          },
          {
            path: 'news/create',
            element: <AddNewsPost/>
          },
          {
            path: 'account',
            element: <AccountPage/>,
            children: [
              {
                path: 'profile',
                element: <ProfileLayout/>
              },
              {
                path: 'comments',
                element: <MyCommentsLayout/>
              },
              {
                path: 'editor',
                children: [
                  {
                    path: 'drafted-news',
                    element: <DraftedNewsLayout/>
                  }
                ]
              },
              {
                path: 'admin',
                children: [
                  {
                    path: 'users',
                    element: <UserManagementLayout/>
                  },
                  {
                    path: 'news',
                    element: <CheckNews/>
                  },
                  {
                    path: 'news/:id',
                    element: <AdminNewsReview/>
                  }
                ]
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