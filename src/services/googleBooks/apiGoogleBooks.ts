import axios from 'axios';
import { parseBook } from '../../utils/helpers';
import { IBook } from '../../utils/types';

// referene: https://developers.google.com/books/docs/v1/reference/volumes/get
export const getBookFromGoogle = async (bookId: string) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
  );
  const data = parseBook(response.data);
  return data;
};

export const searchForBooksFromGoogle = async (
  searchValue: string,
  controller: AbortController,
) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=8`,
      { signal: controller.signal },
    );
    if (response.status != 200) throw new Error('Book not found');

    // - response type: https://developers.google.com/books/docs/v1/reference/volumes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const booksFromApi: IBook[] = response.data.items.map((book: any) =>
      parseBook(book),
    );

    return booksFromApi;
  } catch (e) {
    console.log(`Error fetching books: ${(e as Error).message}`);
  }
};
