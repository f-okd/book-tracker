import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('test for error page', () => {
  it('should display an error message if a message is given', () => {
    render(<Error message="Test message" />);
    expect(screen.getByTestId('errorMessage')).toHaveTextContent(
      'Test message',
    );
  });
  it('should display an error message if no message is given', () => {
    render(<Error />);
    expect(screen.getByTestId('errorMessage')).toHaveTextContent('Not Found');
  });
});
