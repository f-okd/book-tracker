import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Error from '../../Error/Error';
import Layout from './Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

const TestElem = () => {
  return <div>Test</div>;
};

const routesConfig = [
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <TestElem />,
      },
    ],
  },
];
const router = createBrowserRouter(routesConfig);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const TestEnv = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

describe('test for layout wrapper component', () => {
  it('should render the child element passed as outlet', () => {
    render(<TestEnv />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
