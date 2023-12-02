import { describe } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import Home from './Home';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('test for home page', () => {
  it('should show searchbar and search results list', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    const searchbar = screen.getByTestId('searchInput');
    expect(searchbar).toBeInTheDocument();

    const searchResultsList = screen.getByTestId('searchResultList');
    expect(searchResultsList).toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(searchbar, 'choc');
    waitFor(() => expect(searchbar).toHaveValue('chocolate'), {
      timeout: 5000,
    });

    // FETCHING FROM API not working?
    // const searchResultItems = screen.getAllByTestId('searchResultItem');
    // expect(searchResultItems).length.toBe(8)
  });
});
