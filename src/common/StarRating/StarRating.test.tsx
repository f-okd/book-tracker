import { describe } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import StarRating from './StarRating';
import userEvent from '@testing-library/user-event';

describe('test for star rating', () => {
  render(<StarRating defaultRating={3} onSetRating={() => {}} />);
  it('should check all stars are rendered', () => {
    const stars = screen.getAllByTestId('star');
    expect(stars.length).toBe(5);
  });
  it('should check X stars are rendered as full when X is passed as default rating', () => {
    render(<StarRating defaultRating={3} onSetRating={() => {}} />);
    const fullStars = screen.getAllByTestId('fullStar');
    const emptyStars = screen.getAllByTestId('blankStar');
    expect(fullStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });
  it('should update the number of filled in stars when the user clicks on a star', async () => {
    // Initially 3 stars are full
    render(<StarRating defaultRating={3} onSetRating={() => {}} />);
    const firstStar = screen.getAllByTestId('star');
    const user = userEvent.setup();
    await user.click(firstStar[0]);
    // After clicking the first star only one star is full
    await waitFor(() => {
      expect(screen.getAllByTestId('fullStar').length).toBe(1);
    });
  });
});
