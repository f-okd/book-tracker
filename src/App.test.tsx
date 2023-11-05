import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WrappedApp, App } from './App';

// describe is used to set up a testing suit
// a testing suite may contain one or more tests
describe('App', () => {
  it('Renders hello world', () => {
    // 1. ARRANGE - Get test setup
    render(<WrappedApp />);
    // 2. ACT - Do what the user may do with this component

    // 3. EXPECT - Check if the outcome is as expected
    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('Hello World');
  });
  it('renders notfound on an invalid path', () => {
    const invalidRoute = '/invalid/route';
    render(
      <MemoryRouter initialEntries={[invalidRoute]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('Not Found');
  });
});
