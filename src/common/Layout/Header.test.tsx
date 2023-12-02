/*

The tests for the buttons revolve around the fact that 
...the text for the buttons on the mobile view and large viewport differ slightly
...e.g. Mobile menu: "My Settings", on desktop will show "Settings"
*/

import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';

export const ShowPath = (): ReactNode => {
  const location = useLocation();
  return <div>{location.pathname}</div>;
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
          <Header />
          <ShowPath />
        </>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('test for header', () => {
  it('should render home button which navigates to the homepage', async () => {
    render(<TestEnv />);
    const homePageLink = screen.getByTestId('homePageLink');
    expect(homePageLink).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(homePageLink);
    await waitFor(() => {
      expect(screen.getByText('/')).toBeInTheDocument();
    });
  });
  it('should render "My List" button which navigates to the book list page', async () => {
    render(<TestEnv />);
    const myListButton = screen.getByRole('link', { name: 'My list' });
    expect(myListButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(myListButton);
    await waitFor(() => {
      expect(screen.getByText('/mybooks')).toBeInTheDocument();
    });
  });
  it('should render "Settings" button which navigates to the settings page', async () => {
    render(<TestEnv />);
    const settingsButton = screen.getByRole('link', { name: 'Settings' });
    expect(settingsButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(settingsButton);
    await waitFor(() => {
      expect(screen.getByText('/settings')).toBeInTheDocument();
    });
  });
  /*
    We should be testing for visibility of the buttons,
    but the hidden class is dynamically applied and doesn't get picked up by testing library
    Instead we just check all the buttons are successfully rendered
  */
  it('should render Menu toggle button (mobile devices)', async () => {
    render(<TestEnv />);
    const mobileMenuToggleButton = screen.getByTestId(
      'mobile-ButtonToggleDropDownMenu',
    );
    const mobileListButton = screen.getByRole('link', { name: 'My List' });
    const mobileSettingsButton = screen.getByRole('link', {
      name: 'My Settings',
    });

    // mobile is visible
    expect(mobileMenuToggleButton).toBeInTheDocument();
    expect(mobileListButton).toBeInTheDocument();
    expect(mobileSettingsButton).toBeInTheDocument();
  });
});
