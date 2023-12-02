import { describe } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

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
      <MemoryRouter>
        <>
          <Login />
        </>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('test for login page component', () => {
  it('should render the correct inputs which can be typed in', async () => {
    render(<TestEnv />);
    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');

    const user = userEvent.setup();
    await user.type(emailInput, 'test@test.com');
    await waitFor(() => expect(emailInput).toHaveTextContent('test@test.com'));
    await user.type(passwordInput, 'password123');
    await waitFor(() => expect(emailInput).toHaveTextContent('password123'));
  });
  it('should render sign in button and google sign in button', () => {
    render(<TestEnv />);
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'Sign in with Google',
      }),
    ).toBeInTheDocument();
  });
});
