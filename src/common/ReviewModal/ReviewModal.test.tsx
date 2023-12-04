import { describe } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import ReviewModal from './ReviewModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ModalContext } from './ModalProvider';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const testReviewData = {
  comment: 'test comment',
  book_id: 'test book id',
  rating: 1,
};
const contextValue = {
  isModalOpen: true,
  reviewData: testReviewData,
  openModalWithReview: () => {},
  closeModal: () => {
    alert('closeModal clicked');
  },
};

const TestEnv = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ModalContext.Provider value={contextValue}>
          <ReviewModal />
        </ModalContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('test for review modal', () => {
  it('should render the star rating component', () => {
    render(<TestEnv />);
    expect(screen.getByTestId('starRating')).toBeInTheDocument();
  });
  it('should mount review modal with whatever values are passed into it', () => {
    // Remember we pass reviewData into our modal context; rating:1, comment: test comment
    render(<TestEnv />);
    const fullStars = screen.getAllByTestId('fullStar');
    expect(fullStars).toHaveLength(1);

    expect(screen.getByTestId('commentInput')).toHaveTextContent(
      'test comment',
    );
  });
  it('should render the comment input field and accept values', async () => {
    render(<TestEnv />);
    const reviewInputField = screen.getByTestId('commentInput');
    expect(reviewInputField).toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(reviewInputField, 'changed review value');
    expect(reviewInputField).toHaveTextContent('changed review value');
  });
  it('should update the number of filled in stars when the user clicks on a star', async () => {
    // Initially 3 stars are full
    render(<TestEnv />);
    const firstStar = screen.getAllByTestId('star');
    const user = userEvent.setup();
    await user.click(firstStar[0]);
    // After clicking the first star only one star is full
    await waitFor(() => {
      expect(screen.getAllByTestId('fullStar').length).toBe(1);
    });
  });
  it('should have clickable buttons to send/cancel the review ', async () => {
    // set up a listener for alerts called, pass alert ()=>{} as our onClose fn and assert an alert will be called
    const alertMock = vitest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});
    render(<TestEnv />);
    const cancelReviewButton = screen.getByTestId('cancelReviewButton');
    expect(screen.getByTestId('submitReviewButton')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(cancelReviewButton);
    expect(alertMock).toHaveBeenCalledOnce();
  });
});
