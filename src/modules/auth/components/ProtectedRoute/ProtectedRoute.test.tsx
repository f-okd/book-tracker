import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';
import * as supabaseAuthHelpers from '../../../../services/supabase/apiAuth';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supbaseGetCurrentUserMock = vi.spyOn(
  supabaseAuthHelpers,
  'supbaseGetCurrentUser',
);

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
      <BrowserRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const TestComponent = () => {
  return <div>Test</div>;
};

describe('test for protected route component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should attempt to get the current user when rendered', () => {
    render(<TestEnv />);

    expect(supbaseGetCurrentUserMock).toHaveBeenCalledTimes(1);
    supbaseGetCurrentUserMock.mockRestore();
  });
});
