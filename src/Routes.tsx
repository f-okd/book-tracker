import Error from './common/Error/Error';
import Layout from './common/Layout/Layout';
import Home from './modules/home/components/Home';
import Dashboard from './modules/dashboard/Dashboard';
import Book from './modules/booksSearch/components/BookDetailsPage';
import { loader as bookLoader } from './modules/booksSearch/components/BookDetailsPage';
import Login from './modules/auth/components/Login';
import BookListPage from './modules/booksList/components/BookListPage';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';

// need to keep routes config separate so we can instantiate different types of routers for tests/production
// see App.test.tsx for use with MemoryRouter
export const routesConfig = [
  {
    element: <Layout />, // will wrap around child routes
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/book/:bookId',
        element: <Book />,
        loader: bookLoader,
        errorElement: (
          <ProtectedRoute>
            <Error />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mybooks',
        element: (
          <ProtectedRoute>
            <BookListPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
