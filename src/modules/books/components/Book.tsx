import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { getBookFromGoogle } from '../../../services/googleBooks/apiGoogleBooks';
import { IBook } from '../../../utils/types';
import BookDetails from './BookDetails';

const Book = () => {
  const book: IBook = useLoaderData() as IBook;
  return (
    <main className="bg-primary border-solid border-4 border-ternary flex-1 flex flex-col justify-center items-center pt-1/3 min-h-screen">
      <BookDetails book={book} />
    </main>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log(params.bookId);
  const book: IBook = await getBookFromGoogle(params.bookId ?? '');
  return book;
};

export default Book;
