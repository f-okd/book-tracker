import Error from './common/Error/Error';
import Layout from './common/Layout/Layout';
import Home from './modules/home/components/Home/Home';
import Book from './modules/booksSearch/components/BookDetailsPage';
import { loader as bookLoader } from './modules/booksSearch/components/BookDetailsPage';
import Login from './modules/auth/components/Login/Login';
import BookListPage from './modules/booksList/components/BookListPage';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import SignUp from './modules/auth/components/SignUp/SignUp';
import Settings from './modules/settings/Settings';

// need to keep routes config separate so we can instantiate different types of routers for tests/production
// see App.test.tsx for use with MemoryRouter
export const routesConfig = [
  {
    element: (
      <ProtectedRoute>
        <Layout />
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
    element: <Login />,
    path: 'login',
  },
  {
    element: <SignUp />,
    path: 'register',
  },
];
