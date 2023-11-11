import { IBook } from './types';

// response type: https://developers.google.com/books/docs/v1/reference/volumes ---> not defining that lol
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseBook = (apiResponse: any): IBook => {
  const { id, volumeInfo } = apiResponse;
  const { title, publishedDate, description, imageLinks } = volumeInfo;
  const { smallThumbnail, thumbnail } = imageLinks;

  const extractedData = {
    id,
    title,
    publishedDate,
    description,
    smallThumbnail,
    thumbnail,
  };

  return extractedData;
};
