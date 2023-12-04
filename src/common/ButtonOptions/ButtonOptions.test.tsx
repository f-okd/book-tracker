import { describe } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import ButtonOptions from './ButtonOptions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { statusType } from '../../modules/booksList/components/BookListPage';
import userEvent from '@testing-library/user-event';
import * as supabaseBookHelpers from '../../services/supabase/apiBooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const openModalMock = vi.fn();

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
  openModal = openModalMock,
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
  afterEach(() => {
    vi.restoreAllMocks();
  });
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
  it('should call correct supabaseBookApi function when the user clicks the "markRead | markDropped | Remove" button', async () => {
    const supabaseMarkBookAsReadMock = vi.spyOn(
      supabaseBookHelpers,
      'supabaseMarkBookAsRead',
    );
    const supabaseMarkBookAsDroppedMock = vi.spyOn(
      supabaseBookHelpers,
      'supabaseMarkBookAsDropped',
    );
    const supabaseRemoveBookFromListMock = vi.spyOn(
      supabaseBookHelpers,
      'supabaseMarkBookAsRead',
    );

    render(<StatusReadingTestEnv />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('markReadButton'));
    waitFor(() => {
      expect(supabaseMarkBookAsReadMock).toHaveBeenCalledTimes(1);
    });
    await user.click(screen.getByTestId('markDroppedButton'));
    waitFor(() => {
      expect(supabaseMarkBookAsDroppedMock).toHaveBeenCalledTimes(1);
    });
    await user.click(screen.getByTestId('removeButton'));
    waitFor(() => {
      expect(supabaseRemoveBookFromListMock).toHaveBeenCalledTimes(1);
    });

    supabaseRemoveBookFromListMock.mockRestore();
    supabaseMarkBookAsDroppedMock.mockRestore();
    supabaseMarkBookAsReadMock.mockRestore();
  });
  it('should call correct supabaseBookApi function when the user clicks the "markReading | Remove" button', async () => {
    const supabaseMarkBookAsReadingMock = vi.spyOn(
      supabaseBookHelpers,
      'supabaseMarkBookAsReading',
    );
    const supabaseRemoveBookFromListMock = vi.spyOn(
      supabaseBookHelpers,
      'supabaseRemoveBookFromList',
    );

    render(<StatusToReadTestEnv />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('markReadingButton'));
    waitFor(() => {
      expect(supabaseMarkBookAsReadingMock).toHaveBeenCalledTimes(1);
    });
    await user.click(screen.getByTestId('removeButton'));
    waitFor(() => {
      expect(supabaseRemoveBookFromListMock).toHaveBeenCalledTimes(1);
    });

    supabaseRemoveBookFromListMock.mockRestore();
    supabaseMarkBookAsReadingMock.mockRestore();
  });
  it('should call openModal function when the user clicks the "addReview" button', async () => {
    render(<StatusUnreviewedTestEnv />);

    const user = userEvent.setup();

    await user.click(screen.getByTestId('addReviewButton'));
    expect(openModalMock).toHaveBeenCalledTimes(1);
  });
  it('should call openModal function when the user clicks the "editReview" button', async () => {
    render(<StatusReviewedTestEnv />);

    const user = userEvent.setup();

    await user.click(screen.getByTestId('editReviewButton'));
    expect(openModalMock).toHaveBeenCalledTimes(1);
  });
});
