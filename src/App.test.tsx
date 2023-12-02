import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routesConfig } from './Routes';

// describe is used to set up a testing suit
// a testing suite may contain one or more tests
describe('App', () => {
  it('renders notfound on an invalid path', () => {
    render(<App />);
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['invalid/route'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('notFoundErrorMessage')).toHaveTextContent(
      'Not Found',
    );
  });
});
