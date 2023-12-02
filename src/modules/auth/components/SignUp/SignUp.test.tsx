import { describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp';

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
          <SignUp />
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
    const confirmPasswordInput = screen.getByTestId('confirmPasswordInput');

    const user = userEvent.setup();
    await user.type(emailInput, 'test@test.com');
    expect(emailInput).toHaveValue('test@test.com');
    screen.debug(emailInput);
    await user.type(passwordInput, 'password123');
    expect(passwordInput).toHaveValue('password123');
    await user.type(confirmPasswordInput, 'password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });
  it('should show the login link', async () => {
    render(<TestEnv />);
    expect(
      screen.getByRole('link', {
        name: 'Already have an account? Login',
      }),
    ).toBeInTheDocument();
  });
});
