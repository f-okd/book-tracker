import { describe } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, useLocation } from 'react-router-dom';
import * as supabaseAuthHelpers from '../../../../services/supabase/apiAuth';

export const ShowPath = () => {
  const location = useLocation();
  return <div data-testid="pathname">{location.pathname}</div>;
};

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
          <ShowPath />
        </>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('test for login page component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should render the correct inputs which can be typed in', async () => {
    render(<TestEnv />);
    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');

    const user = userEvent.setup();
    await user.type(emailInput, 'test@test.com');
    await waitFor(() => expect(emailInput).toHaveValue('test@test.com'));
    await user.type(passwordInput, 'password123');
    await waitFor(() => expect(passwordInput).toHaveValue('password123'));
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
  it('should call the supabaseLogin function when a user clicks the sign in button', async () => {
    const supabaseLoginMock = vi.spyOn(supabaseAuthHelpers, 'supabaseLogin');
    render(<TestEnv />);
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');

    const user = userEvent.setup();
    await user.type(emailInput, 'a@a.com');
    await user.type(passwordInput, '1234567890123456');
    await user.click(signInButton);

    // we don't waitFor so it should immediately change after being clicked
    expect(signInButton).toHaveTextContent('....logging in');
    expect(supabaseLoginMock).toHaveBeenCalledWith({
      email: 'a@a.com',
      password: '1234567890123456',
    });
  });
  it('should call supabaseSignInWithGoogle() when the user clicks the sign in with google function', async () => {
    const supabaseSignInWithGoogleMock = vi.spyOn(
      supabaseAuthHelpers,
      'supabaseSignInWithGoogle',
    );
    render(<TestEnv />);

    const signInWithGoogleButton = screen.getByRole('button', {
      name: 'Sign in with Google',
    });

    const user = userEvent.setup();
    await user.click(signInWithGoogleButton);

    expect(supabaseSignInWithGoogleMock).toHaveBeenCalledTimes(1);
    supabaseSignInWithGoogleMock.mockRestore();
  });
  it('should render the link to go to the register page', async () => {
    render(<TestEnv />);
    const navigateToRegisterLink = screen.getByRole('link', {
      name: 'Sign Up (Email)',
    });
    expect(navigateToRegisterLink).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(navigateToRegisterLink);
    waitFor(() => {
      expect(screen.getByTestId('pathname')).toHaveTextContent('/register');
    });
  });
});
