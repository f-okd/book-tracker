/*
  A different function fetches all records in the DB
  This hook splits the books into an object of multiple arrays, indexed/accessible by status value 
    -  statusType: "toRead" | "reading" | "read" | "dnf"
*/

import { ReviewsRecord } from '../../../services/supabase/apiBooks';

type BooksByStatus = {
  [key: string]: ReviewsRecord[];
};

// Give default value of empty array or we'll clash with react query in BookListPage.tsx if empty (its always expecting an array)
export const useCategoriseBooksFromDb = (
  books: ReviewsRecord[] = [],
): BooksByStatus => {
  const categorisedBooks: BooksByStatus = {
    read: [],
    reading: [],
    toRead: [],
    didNotFinish: [],
  };
  books.map((book) => {
    switch (book.status) {
      case 'read':
        categorisedBooks.read.push(book);
        break;
      case 'reading':
        categorisedBooks.reading.push(book);
        break;
      case 'didNotFinish':
        categorisedBooks.didNotFinish.push(book);
        break;
      // If null then its just been added to their list => mark as to read
      default:
        categorisedBooks.toRead.push(book);
    }
  });
  // console.log('Categorised books:');
  // console.log(categorisedBooks);
  return categorisedBooks;
};
