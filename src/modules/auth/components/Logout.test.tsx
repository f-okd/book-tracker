import { describe, expect, it } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import Logout from './Logout';
import userEvent from '@testing-library/user-event';
import * as supabaseAuthHelpers from '../../../services/supabase/apiAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

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
        <>
          <Logout />
        </>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('test for logout button', () => {
  it('should call the supabaseLogout() function when clicked', async () => {
    render(<TestEnv />);
    const supabaseLogoutMock = vi.spyOn(supabaseAuthHelpers, 'supbaseLogout');

    const logoutButton = screen.getByTestId('logoutButton');
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveTextContent('Logout');

    const user = userEvent.setup();
    await user.click(logoutButton);
    waitFor(() => {
      expect(supabaseLogoutMock).toHaveBeenCalledTimes(1);
    });
  });
});
