import axios, { GenericAbortSignal } from 'axios';
import { parseBook } from '../utils/helpers';

// referene: https://developers.google.com/books/docs/v1/reference/volumes/get
export const getBook = async (bookId: string) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
  );
  const data = parseBook(response.data);
  return data;
};

export const getBooks = async (
  searchValue: string,
  controller: AbortController,
) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=8`,
    { signal: controller.signal },
  );

  return response;
};
