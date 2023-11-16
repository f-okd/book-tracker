/*
SERVES TWO PRIMARY FUNCTIONS

1) Displays book details passed in from BookDetailsPage.tsx
2) Checks the database for the status of this book "toRead | Reading | Read | dnf | undefined"
    - operations available to the user for this book depends on the status of this book
    - fetch and store the book with react query, if the record doesnt exist in the db when we try and access the status attribute
      it will be undefined, otherwise we proceed as needed

*/
import { useQuery } from '@tanstack/react-query';
import Button from '../../../common/Button/Button';
import { IBook } from '../../../utils/types';
import { useMarkBookAsToRead } from '../hooks/useMarkBookAsToRead';
import { supabaseGetBookFromDb } from '../../../services/supabase/apiBooks';
import Loader from '../../../common/Loader/Loader';
import { ReactElement } from 'react';

interface IBookDetails {
  book: IBook;
}

/*
  Book details card
*/
const BookDetails = ({ book }: IBookDetails) => {
  const { isMarkingToRead, markAsToRead } = useMarkBookAsToRead();
  const {
    // provide default value as is possibly undefined
    data: review = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['currentBook', book.id],
    queryFn: () => supabaseGetBookFromDb(book.id),
  });

  if (isLoading) return <Loader />;

  if (error) return <h1>Error fetching review</h1>;

  const reviewData = review[0] || [];

  /*
    Decide buttons/review form to render based on current book status 
  */
  const renderButtonOptionsByStatus = (status: string | null): ReactElement => {
    switch (status) {
      case 'dnf':
        return (
          <>
            <p>ADD/UPDATE REVIEW FORM</p>
            <p>REMOVE FROM LIST</p>
            <p>MARK AS READING</p>
          </>
        );
      case 'read':
        return (
          <>
            <p>ADD/UPDATE REVIEW FORM</p>
            <p>REMOVE FROM LIST</p>
          </>
        );
      case 'reading':
        return (
          <>
            <p>MARK AS READ</p>
            <p>MARK AS DROPPED</p>
            <p>REMOVE FROM LIST</p>
          </>
        );
      case 'toRead':
        return (
          <>
            <p>MARK AS READING</p>
            <p>REMOVE FROM LIST</p>
          </>
        );

      /*
        If undefined that means there's no record of this book at all in our db so give the option to add to list
      */
      default:
        return (
          <Button
            type="ternary"
            disabled={isMarkingToRead === 'pending'}
            onClick={() =>
              markAsToRead({ book_id: book.id, book_title: book.title })
            }
          >
            Add to List
          </Button>
        );
    }
  };

  return (
    <div
      id="bookCard"
      className="flex flex-col bg-secondary p-5 w-[90%] md:w-[60%] rounded-3xl border border-ternary"
    >
      <h2 className="text-3xl font-semibold mb-2">{book.title}</h2>

      <p className="text-sm italic mb-4">
        {book.authors && book.authors.length > 0
          ? book.authors.join(', ')
          : 'No authors listed'}
      </p>

      <img
        className="self-center border border-ternary rounded-xl mb-4 w-1/3 md:w-1/4"
        src={book.thumbnail ?? 'bookNotFound.png'}
        alt={`Cover of the book: ${book.title}`}
      />

      {book.description && (
        <p className="text-sm mb-4 sm:text-base md:text-lg">
          {book.description}
        </p>
      )}
      {renderButtonOptionsByStatus(reviewData.status)}
    </div>
  );
};

export default BookDetails;
