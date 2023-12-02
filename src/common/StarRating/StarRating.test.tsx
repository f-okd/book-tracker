import { describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import StarRating from './StarRating';

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
});
