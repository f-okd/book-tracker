import { describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import SearchResultItem from './SearchResultItem';
import { IBook } from '../../../../utils/types';
import { BrowserRouter } from 'react-router-dom';

const testBook: IBook = {
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

describe('test for search result item component', () => {
  it('should render the book details and view button', () => {
    render(
      <BrowserRouter>
        <SearchResultItem book={testBook} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('searchResultItem')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View' })).toBeInTheDocument();
    expect(screen.getByTestId('bookTitle')).toHaveTextContent(testBook.title);
    expect(screen.getByTestId('bookAuthors')).toHaveTextContent(
      testBook.authors[0],
    );
    //Check image alt text and src
    expect(
      screen.getByAltText(`Book Thumbail for ${testBook.title}`),
    ).toBeInTheDocument();
    const displayedImage = document.querySelector('img') as HTMLImageElement;
    expect(displayedImage.src).toContain(testBook.smallThumbnail);
  });
});
