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
  if (!books) return <h1>No books in list</h1>;

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
      <div className="flex flex-row">
        {returnDataSetByFilter(statusToFilterBy)?.map((book) => (
          <BookPreview key={book.book_id} book={book} />
        ))}
      </div>
    </>
  );
};

export default BookList;
