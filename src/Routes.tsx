import Error from './common/Error/Error';
import Layout from './common/Layout/Layout';
import Home from './modules/home/home/components/Home';
import Dashboard from './modules/dashboard/Dashboard';
import Book from './modules/books/booksSearch/components/BookDetailsPage';
import { loader as bookLoader } from './modules/books/booksSearch/components/BookDetailsPage';
import Login from './modules/auth/components/Login';
import BookListPage from './modules/books/booksUser/components/BookListPage';

// need to keep routes config separate so we can instantiate different types of routers for tests/production
// see App.test.tsx for use with MemoryRouter
export const routesConfig = [
  {
    element: <Layout />, // will wrap around child routes
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/book/:bookId',
        element: <Book />,
        loader: bookLoader,
        errorElement: <Error />,
      },
      {
        path: '/myboook',
        element: <BookListPage />,
      },
    ],
  },
];
