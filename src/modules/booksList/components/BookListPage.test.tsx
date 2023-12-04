import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import BookListPage from './BookListPage';
import * as supabaseBookHelpers from '../../../services/supabase/apiBooks';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supbaseGetBooksFromDbMock = vi.spyOn(
  supabaseBookHelpers,
  'getBooksFromDb',
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
        <BookListPage />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('test for protected route component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should attempt to get the current user when rendered', () => {
    render(<TestEnv />);
    expect(supbaseGetBooksFromDbMock).toHaveBeenCalledTimes(1);
  });
});
