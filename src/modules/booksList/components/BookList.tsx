import { AllBooksByStatus } from '../../../services/supabase/apiBooks';
import { statusType } from './BookListPage';
import BookPreview from './BookPreview';

interface IBookList {
  status: statusType;
  books: AllBooksByStatus | undefined;
}

const BookList = ({ status = 'toRead', books }: IBookList) => {
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
      <h1 className="text-3xl font-bold uppercase"> {status}</h1>
      {returnDataSetByFilter(status)?.map((book) => (
        <BookPreview key={book.book_id} book={book} status={status} />
      ))}
    </>
  );
};

export default BookList;
