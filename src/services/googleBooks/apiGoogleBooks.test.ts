import { describe } from 'vitest';
import { getBookFromGoogle, searchForBooksFromGoogle } from './apiGoogleBooks';
import { IBook } from '../../utils/types';

const testBook: IBook = {
  id: 'UUFADwAAQBAJ',
  title: 'Hello World',
  authors: ['Murray Ewing'],
  publishedDate: '2017-11-08',
  description:
    '<p>It’s 1984, and 13-year-old Tim is sitting on the school roof, waiting for the world to end.</p><p>Or at least for it to start making sense.</p><p>His life <i>used</i> to make sense. It was made up of two things: the exciting new world of home computers, and worries about nuclear war.</p><p>There were certainly no girls in it.</p><p>But then he met Penny, who’s into pop music, and somehow manages to be optimistic about life, despite having a very difficult mother. (Difficult, as in, she sometimes throws roof tiles at people.) For the first time since the death of his own mother three years ago, Tim starts to see a whole new possibility in life.</p><p>Then he loses Penny. So what else <i>is</i> there to do but climb onto the school roof and wait for the world to end? </p>',
  smallThumbnail:
    'http://books.google.com/books/publisher/content?id=UUFADwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72Y9lCFdFUFiePUKzny2ecWz3lQ3aTorlegk3xZqC7Np656rCvo776vIXc7bfqNFX-Zy6VIeTSNWBDn0XVJa96RMMSQii5YkqX8l6m7NT35Yrrm59kRs_yAW2BbzoXO9vPHn5R6&source=gbs_api',
  thumbnail:
    'http://books.google.com/books/content?id=UUFADwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
};

describe('test for Google Books Api', () => {
  it('should return a volume object if you fetch a book by id', async () => {
    const bookFromApi = await getBookFromGoogle('UUFADwAAQBAJ ');
    expect(bookFromApi.id).toEqual(testBook.id);
    expect(bookFromApi.title).toEqual(testBook.title);
    expect(bookFromApi.authors).toEqual(testBook.authors);
    expect(bookFromApi.publishedDate).toEqual(testBook.publishedDate);
    expect(bookFromApi.description).toBeDefined();
    expect(bookFromApi.smallThumbnail).toBeDefined();
    expect(bookFromApi.thumbnail).toBeDefined();
  });
  it('should return 8 volumes when you query by value', async () => {
    const controller = new AbortController();
    const booksFetched = await searchForBooksFromGoogle('hello', controller);
    expect(booksFetched?.length).toBe(8);
  });
});
