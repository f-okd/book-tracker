import { describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpdatePasswordForm from './UpdatePasswordForm';
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
          <UpdatePasswordForm />
        </>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('test for update password form component', async () => {
  it('should give an error message if the passwords entered are too short', async () => {
    render(<TestEnv />);
    const confirmPasswordInput = screen.getByTestId('confirmPasswordInput');
    const passwordInput = screen.getByTestId('passwordInput');

    const user = userEvent.setup();
    await user.type(passwordInput, '123');
    await user.type(confirmPasswordInput, '123');
    await user.click(screen.getByTestId('updatePasswordButton'));

    expect(screen.getByTestId('passwordErrorMessage')).toHaveTextContent(
      'Password must be at least 16 characters long',
    );
  });
  it('should give an error message if passwords do not match', async () => {
    render(<TestEnv />);
    const confirmPasswordInput = screen.getByTestId('confirmPasswordInput');
    const passwordInput = screen.getByTestId('passwordInput');

    const user = userEvent.setup();
    await user.type(passwordInput, '123');
    await user.type(confirmPasswordInput, '456');
    await user.click(screen.getByTestId('updatePasswordButton'));

    expect(screen.getByTestId('confirmPasswordErrorMessage')).toHaveTextContent(
      'Passwords do not match',
    );
  });
  it('should give an error message if you try to submit without entering a password', async () => {
    render(<TestEnv />);

    const user = userEvent.setup();
    await user.click(screen.getByTestId('updatePasswordButton'));

    expect(screen.getByTestId('passwordErrorMessage')).toHaveTextContent(
      'password is required',
    );
    expect(screen.getByTestId('confirmPasswordErrorMessage')).toHaveTextContent(
      'Please confirm password',
    );
  });
});
