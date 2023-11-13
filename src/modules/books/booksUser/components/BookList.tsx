import { AllBooksByStatus } from '../../../../services/supabase/apiBooks';
import { statusType } from './BookListPage';

interface IBookList {
  status: statusType;
  books: AllBooksByStatus | undefined;
}

const BookList = ({ status, books }: IBookList) => {
  if (!books) return <h1>No books in list</h1>;
  switch (status) {
    case 'reading':
      return <h1>Books Reading</h1>;
    case 'read':
      return <h1>Books read</h1>;
    case 'dnf':
      return <h1>Books dnf</h1>;
    case 'toRead':
      return <h1>To read list</h1>;
    default:
      return <h1>No books in list</h1>;
  }
};

export default BookList;
