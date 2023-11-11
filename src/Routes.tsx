import Error from './common/Error/Error';
import Layout from './common/Layout/Layout';
import Dashboard from './modules/Dashboard/Dashboard';
import Home from './modules/Home/home/components/Home';

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
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/books',
        element: <Home />,
      },
    ],
  },
];
