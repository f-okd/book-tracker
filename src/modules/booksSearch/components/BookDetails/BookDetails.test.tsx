import { describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import BookDetails from './BookDetails';
import { IBook } from '../../../../utils/types';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import * as supabaseBookHelpers from '../../../../services/supabase/apiBooks';

const supabaseGetBookFromDbMock = vi.spyOn(
  supabaseBookHelpers,
  'supabaseGetBookFromDb',
);

const book: IBook = {
  id: 'UUFADwAAQBAJ',
  title: 'Hello World',
  authors: ['Murray Ewing'],
  publishedDate: '2017-11-08',
  description:
    'It’s 1984, and 13-year-old Tim is sitting on the school roof, waiting for the world to end. Or at least for it to start making sense. His life used to make sense. It was made up of two things: the exciting new world of home computers, and worries about nuclear war. There were certainly no girls in it. But then he met Penny, who’s into pop music, and somehow manages to be optimistic about life, despite having a very difficult mother. (Difficult, as in, she sometimes throws roof tiles at people.) For the first time since the death of his own mother three years ago, Tim starts to see a whole new possibility in life. Then he loses Penny. So what else is there to do but climb onto the school roof and wait for the world to end?',
  smallThumbnail:
    'http://books.google.com/books/content?id=UUFADwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  thumbnail:
    'http://books.google.com/books/content?id=UUFADwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const TestEnv = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <>
          <BookDetails book={book} />
        </>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Book will not be read by user by default
describe('test for review component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should call supabaseGetBookFromDb and also render the correct information for this book', async () => {
    render(<TestEnv />);
    waitFor(() => expect(supabaseGetBookFromDbMock).toHaveBeenCalledTimes(1));
    await waitFor(
      () => {
        expect(screen.getByTestId('bookTitle')).toHaveTextContent(book.title);
        expect(screen.getByTestId('addToListButton')).toHaveTextContent(
          'Add to List',
        );
      },
      { timeout: 5000 },
    );
    supabaseGetBookFromDbMock.mockRestore();
  });
});
