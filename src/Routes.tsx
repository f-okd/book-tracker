/* eslint-disable react-refresh/only-export-components */
import Error from './common/Error/Error';
import Layout from './common/Layout/Layout';
import { loader as bookLoader } from './modules/booksSearch/components/BookDetailsPage';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import { Suspense, lazy } from 'react';
import Loader from './common/Loader/Loader';

const Login = lazy(() => import('./modules/auth/components/Login/Login'));
const SignUp = lazy(() => import('./modules/auth/components/SignUp/SignUp'));
const Settings = lazy(() => import('./modules/settings/Settings'));
const Home = lazy(() => import('./modules/home/components/Home/Home'));
const Book = lazy(
  () => import('./modules/booksSearch/components/BookDetailsPage'),
);
const BookListPage = lazy(
  () => import('./modules/booksList/components/BookListPage'),
);

// need to keep routes config separate so we can instantiate different types of routers for tests/production
// see App.test.tsx for use with MemoryRouter
export const routesConfig = [
  {
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <Layout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/book/:bookId',
        element: <Book />,
        loader: bookLoader,
        errorElement: <Error />,
      },
      {
        path: '/mybooks',
        element: <BookListPage />,
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
    path: 'login',
  },
  {
    element: (
      <Suspense fallback={<Loader />}>
        <SignUp />
      </Suspense>
    ),
    path: 'register',
  },
];
