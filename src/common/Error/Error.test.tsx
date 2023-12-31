import { describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Error from './Error';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

export const ShowPath = (): ReactNode => {
  const location = useLocation();
  return <div>{location.pathname}</div>;
};

describe('test for error page', () => {
  it('should display an error message if a message is given', () => {
    render(
      <BrowserRouter>
        <Error message="Test message" />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('errorMessage')).toHaveTextContent(
      'Test message',
    );
  });
  it('should display not found if no error message is passed in', () => {
    render(
      <BrowserRouter>
        <Error />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('notFoundErrorMessage')).toHaveTextContent(
      'Not Found',
    );
  });
  it('should display a link to return to the home page', async () => {
    render(
      <BrowserRouter>
        <Error />
        <ShowPath />
      </BrowserRouter>,
    );
    const navigateHomeButton = screen.getByTestId('notFoundErrorMessage');
    const user = userEvent.setup();
    await user.click(navigateHomeButton);
    await waitFor(() => {
      expect(screen.getByText('/')).toBeInTheDocument();
    });
  });
});
