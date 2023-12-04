import { describe } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, useLocation } from 'react-router-dom';
import SignUp from './SignUp';
import { ReactNode } from 'react';
import * as supabaseAuthHelpers from '../../../../services/supabase/apiAuth';

export const ShowPath = (): ReactNode => {
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
          <SignUp />
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
  it('should render the correct fields which can be typed in', async () => {
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
    const loginLink = screen.getByRole('link', {
      name: 'Already have an account? Login',
    });
    expect(loginLink).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(loginLink);
    await waitFor(() => {
      expect(screen.getByTestId('pathname')).toHaveTextContent('login');
    });
  });
  it('should call the subabaseSignUp() function when the signup button is clicked', async () => {
    const supabaseSignUpMock = vi.spyOn(supabaseAuthHelpers, 'supabaseSignUp');
    render(<TestEnv />);

    const signupButton = screen.getByTestId('signupButton');
    expect(signupButton).toHaveTextContent('Register');

    const user = userEvent.setup();
    await user.type(screen.getByTestId('usernameInput'), 'testUsername');
    await user.type(screen.getByTestId('emailInput'), 'testEmail@test.com');
    await user.type(screen.getByTestId('passwordInput'), 'testPassword1234');
    await user.type(
      screen.getByTestId('confirmPasswordInput'),
      'testPassword1234',
    );
    await user.click(signupButton);

    expect(signupButton).toHaveTextContent('...Signing up');
    waitFor(() => expect(supabaseSignUpMock).toHaveBeenCalledTimes(1));
  });
  it('should show error messages if the user tries to submit without entering any values', async () => {
    render(<TestEnv />);
    expect(screen.getByTestId('allRequired')).toHaveTextContent(
      '* All fields are required',
    );
    const signupButton = screen.getByTestId('signupButton');
    const user = userEvent.setup();
    await user.click(signupButton);

    expect(screen.getByText('* password is required')).toBeInTheDocument();
    expect(screen.getByText('* Username is required')).toBeInTheDocument();
    expect(screen.getByText('* Email is required')).toBeInTheDocument();
    expect(screen.getByText('* Please confirm password')).toBeInTheDocument();
  });
  it('should show an error message if the user tries to enter an invalid email address and prevent navigation', async () => {
    render(<TestEnv />);
    expect(screen.getByTestId('allRequired')).toHaveTextContent(
      '* All fields are required',
    );
    const signupButton = screen.getByTestId('signupButton');
    const user = userEvent.setup();
    await user.click(signupButton);

    await user.type(screen.getByTestId('usernameInput'), 'a');
    await user.type(screen.getByTestId('emailInput'), 'a');
    await user.type(screen.getByTestId('passwordInput'), '1234567890123456');
    await user.type(
      screen.getByTestId('confirmPasswordInput'),
      '1234567890123456',
    );
    expect(
      screen.getByText('* Please provide a valid email address'),
    ).toBeInTheDocument();
  });
  it("should show an error message if the user doesn'nt confirm password", async () => {
    render(<TestEnv />);
    expect(screen.getByTestId('allRequired')).toHaveTextContent(
      '* All fields are required',
    );
    const signupButton = screen.getByTestId('signupButton');
    const user = userEvent.setup();
    await user.click(signupButton);

    await user.type(screen.getByTestId('usernameInput'), 'a');
    await user.type(screen.getByTestId('emailInput'), 'a@a.com');
    await user.type(screen.getByTestId('passwordInput'), '1234567890123456');
    expect(screen.getByText('* Please confirm password')).toBeInTheDocument();
  });
});
