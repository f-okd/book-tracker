import { describe, it } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ShowPath } from '../Button/Button.test';
import NotFound from './NotFound';

describe('test for NotFound page', () => {
  it('should display not found if no error message is passed in', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('notFoundErrorMessage')).toHaveTextContent(
      'Not Found',
    );
  });
  it('should display a link to return to the home page', async () => {
    render(
      <BrowserRouter>
        <NotFound />
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
