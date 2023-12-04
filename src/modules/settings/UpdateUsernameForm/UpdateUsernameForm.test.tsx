import { describe, expect, it } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import UpdateUsernameForm from './UpdateUsernameForm';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as supabaseAuthHelpers from '../../../services/supabase/apiAuth';
import userEvent from '@testing-library/user-event';

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
          <UpdateUsernameForm />
        </>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const supabaseUpdateCurrentUserMock = vi.spyOn(
  supabaseAuthHelpers,
  'supabaseUpdateCurrentUser',
);

describe('test for UpdateUsernameForm component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should render the correct fields', () => {
    render(<TestEnv />);
    expect(screen.getByTestId('emailInput')).toBeDisabled();
    expect(screen.getByTestId('usernameInput')).toBeInTheDocument();
    expect(screen.getByTestId('updateUsernameButton')).toBeInTheDocument();
  });
  it('should call supabaseUpdateCurrentUser when button is clicked with valid input', async () => {
    render(<TestEnv />);
    const usernameInput = screen.getByTestId('usernameInput');
    const updateUsernameButton = screen.getByTestId('updateUsernameButton');

    const user = userEvent.setup();
    await user.type(usernameInput, 'TestUsername');
    waitFor(() => expect(usernameInput).toHaveTextContent('TestUsername'));

    await user.click(updateUsernameButton);
    waitFor(() =>
      expect(supabaseUpdateCurrentUserMock).toHaveBeenCalledTimes(1),
    );
  });
});
