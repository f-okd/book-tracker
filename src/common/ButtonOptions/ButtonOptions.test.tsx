import { describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import ButtonOptions from './ButtonOptions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { statusType } from '../../modules/booksList/components/BookListPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

// Its basically IButtonOptions but with optional props because we give them default values in testEnv
interface ITestEnv {
  bookStatus: statusType;
  book_id?: string;
  book_title?: string;
  comment?: string | null;
  rating?: number | null;
  openModal?: () => void;
}
const TestEnv = ({
  bookStatus,
  book_id = 'id',
  book_title = 'title',
  comment = null,
  rating = null,
  openModal = () => {},
}: ITestEnv) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <>
          <ButtonOptions
            bookStatus={bookStatus}
            book_id={book_id}
            book_title={book_title}
            comment={comment}
            openModal={openModal}
            rating={rating}
          />
        </>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const StatusReadingTestEnv = () => {
  return <TestEnv bookStatus="reading" />;
};
const StatusToReadTestEnv = () => {
  return <TestEnv bookStatus="toRead" />;
};
const StatusDnfTestEnv = () => {
  return <TestEnv bookStatus="dnf" />;
};
const StatusUnreviewedTestEnv = () => {
  return <TestEnv bookStatus="read" />;
};
const StatusReviewedTestEnv = () => {
  return <TestEnv bookStatus="read" comment="test comment" rating={5} />;
};
const UnreadTestEnv = () => {
  return <TestEnv bookStatus="" comment={null} rating={5} />;
};

describe('test for Button options', () => {
  it('should render buttons: "mark read", "mark dropped", "remove", if this book has "reading" status ', () => {
    render(<StatusReadingTestEnv />);
    expect(screen.getByTestId('markReadButton')).toHaveTextContent('Mark read');
    expect(screen.getByTestId('markDroppedButton')).toHaveTextContent(
      'Mark dropped',
    );
    expect(screen.getByTestId('removeButton')).toHaveTextContent('Remove');
  });
  it('should render buttons: "mark reading", "remove", if this book has "toRead" status', () => {
    render(<StatusToReadTestEnv />);
    expect(screen.getByTestId('markReadingButton')).toHaveTextContent(
      'Mark reading',
    );
    expect(screen.getByTestId('removeButton')).toHaveTextContent('Remove');
  });
  it('should render buttons: "mark reading", "remove", if this book has "dnf" status', () => {
    render(<StatusDnfTestEnv />);
    expect(screen.getByTestId('markReadingButton')).toHaveTextContent(
      'Mark reading',
    );
    expect(screen.getByTestId('removeButton')).toHaveTextContent('Remove');
  });
  it('should render "add review" button, if this book has status "read" and has a review', () => {
    render(<StatusUnreviewedTestEnv />);
    expect(screen.getByTestId('addReviewButton')).toHaveTextContent(
      'Add a review',
    );
  });
  it('should render "edit review" button, if this book has status "read" and has a review', () => {
    render(<StatusReviewedTestEnv />);
    expect(screen.getByTestId('editReviewButton')).toHaveTextContent(
      'Edit review',
    );
  });
  it('should render "add to list" button, if this book has not been read', () => {
    render(<UnreadTestEnv />);
    expect(screen.getByTestId('addToListButton')).toHaveTextContent(
      'Add to List',
    );
  });
});
