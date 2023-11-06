import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routesConfig } from './Routes';

// describe is used to set up a testing suit
// a testing suite may contain one or more tests
describe('App', () => {
  it('Renders hello world', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('Hello World');
  });
  
  it('renders notfound on an invalid path', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['invalid/route'],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('Not Found');
  });
});
