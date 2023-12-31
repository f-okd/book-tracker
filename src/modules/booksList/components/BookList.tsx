/*
  BookList.tsx
  - Reading list container
  - takes in local status filter value and a list of all user's book from db
  - calls a helper function "returnDataSetByFilter" that will return filtered dataset depending on status value
  - render multiple mini book cards (BookPreview.tsx) for each of these filtered books 
*/

import { AllBooksByStatus } from '../../../services/supabase/apiBooks';
import { statusType } from './BookListPage';
import BookPreview from './BookPreview';

interface IBookList {
  statusToFilterBy: statusType;
  books: AllBooksByStatus | undefined;
}

const BookList = ({ statusToFilterBy = 'toRead', books }: IBookList) => {
  if (!books)
    return (
      <p className="mt-10 text-3xl text-ternary">
        You haven't added any books to your list 🥲😢🥹😭😿
      </p>
    );

  const returnDataSetByFilter = (status: statusType) => {
    switch (status) {
      case 'read':
        return books.read;
      case 'reading':
        return books.reading;
      case 'dnf':
        return books.dnf;
      default:
        return books.toRead;
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold uppercase"> {statusToFilterBy}</h1>
      <div className="flex flex-row flex-wrap justify-center p-5">
        {returnDataSetByFilter(statusToFilterBy).length > 0 ? (
          returnDataSetByFilter(statusToFilterBy)
            ?.sort(function (a, b) {
              return (b.rating ?? 0) - (a.rating ?? 0);
            })
            .map((book) => <BookPreview key={book.book_id} book={book} />)
        ) : (
          <p className="mt-10 text-3xl text-ternary">
            Nothing to see here yet 😎🚀💎⭐
          </p>
        )}
      </div>
    </>
  );
};

export default BookList;
