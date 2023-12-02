import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from './Review';

describe('test for review component', () => {
  it("should render an error message if user hasn't left a review comment/rating", () => {
    render(<Review comment={null} status="read" rating={null} />);
    expect(screen.getByTestId('errorMessage')).toHaveTextContent(
      "You haven't left a review for this book yet",
    );
  });
  it('should render the comment and the correct number of stars when a message and rating is provided', () => {
    const rating = 3;
    render(<Review comment={'test review'} status="read" rating={rating} />);
    // the actual value of the span will be "⭐⭐⭐" but thats an invalid character to test for
    // instead we pass the rating into the testid of the component and check the values align in the test
    expect(screen.getByTestId(`rating-${rating}`)).toBeInTheDocument();
    expect(screen.getByTestId('reviewComment')).toHaveTextContent(
      'test review',
    );
  });
});
