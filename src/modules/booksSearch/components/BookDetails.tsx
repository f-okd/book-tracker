/*
SERVES TWO PRIMARY FUNCTIONS

1) Displays book details passed in from BookDetailsPage.tsx
2) Checks the database for the status of this book "toRead | Reading | Read | dnf | undefined"
    - operations available to the user for this book depends on the status of this book
    - fetch and store the book with react query, if the record doesnt exist in the db when we try and access the status attribute
      it will be undefined, otherwise we proceed as needed

*/
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IBook } from '../../../utils/types';
import { supabaseGetBookFromDb } from '../../../services/supabase/apiBooks';
import Loader from '../../../common/Loader/Loader';
import ButtonOptions from '../../../common/ButtonOptions/ButtonOptions';
import { statusType } from '../../booksList/components/BookListPage';
import Review from '../../booksList/components/Review';
import { ModalContext } from '../../../common/ReviewModal/ModalProvider';
import parse from 'html-react-parser';

interface IBookDetails {
  book: IBook;
}

/*
  Book details card
*/
const BookDetails = ({ book }: IBookDetails) => {
  const {
    // provide default value as is possibly undefined
    data: review = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['currentBook', book.id],
    queryFn: () => supabaseGetBookFromDb(book.id),
  });

  const { openModalWithReview } = useContext(ModalContext);

  if (isLoading) return <Loader />;
  if (error) return <h1>Error fetching review</h1>;

  /// Try and get the user's review record from db if there is one
  const reviewData = review[0] || [];

  return (
    <div
      id="bookCard"
      className="mt-4 flex w-[90%] flex-col rounded-3xl border border-ternary bg-secondary p-5 md:w-[60%]"
    >
      <h2 className="mb-2 text-3xl font-semibold">{book.title}</h2>

      <p className="mb-4 text-sm italic md:text-xl">
        {book.authors && book.authors.length > 0
          ? book.authors.join(', ')
          : 'No authors listed'}
      </p>

      <img
        className="mb-4 w-1/3 self-center rounded-xl border border-ternary md:w-1/4"
        src={book.thumbnail ?? 'bookNotFound.png'}
        alt={`Cover of the book: ${book.title}`}
      />

      {book.description && (
        <div className="mb-4 text-sm sm:text-base md:text-lg">
          {parse(book.description)}
        </div>
      )}
      {reviewData.status && (
        <p className="mb-4 text-sm italic text-ternary sm:text-base md:text-xl">
          Status: {reviewData.status}
        </p>
      )}
      <Review
        status={reviewData.status as statusType}
        comment={reviewData.comment}
        rating={reviewData.rating}
      />
      <ButtonOptions
        bookStatus={reviewData.status as statusType}
        book_id={book.id}
        book_title={book.title}
        comment={reviewData.comment}
        openModal={openModalWithReview}
        rating={reviewData.rating}
      />
    </div>
  );
};

export default BookDetails;
