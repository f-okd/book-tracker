/*
  BookDetailsPage.tsx:
  - Sort of behaves as middleware
  - We use react router render-as-you-fetch capabilities to query googleBooksApi for the book thats just been clicked
  - Because we pass the book ID to the route/path we can fetch it from the params in the loader

*/

import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { getBookFromGoogle } from '../../../services/googleBooks/apiGoogleBooks';
import { IBook } from '../../../utils/types';
import BookDetails from './BookDetails';

/*
  Main container for book details page
*/
const Book = () => {
  const book: IBook = useLoaderData() as IBook;
  return (
    <main className="pt-1/3 flex min-h-screen flex-1 flex-col items-center justify-center border-4 border-solid border-ternary bg-primary">
      <BookDetails book={book} />
    </main>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }: LoaderFunctionArgs) => {
  // console.log(params.bookId);
  const book: IBook = await getBookFromGoogle(params.bookId ?? '');
  return book;
};

export default Book;
