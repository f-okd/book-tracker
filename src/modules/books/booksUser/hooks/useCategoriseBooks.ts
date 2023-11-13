import { Database } from '../../../../../types/supabase';

type UserBooksRow = Database['public']['Tables']['UserBooks']['Row'];

type BooksByStatus = {
  [key: string]: UserBooksRow[];
};

// give default value of empty array or we'll clash with react query in BookListPage.tsx
export const useCategoriseBooksFromDb = (
  books: UserBooksRow[] = [],
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
      // if null then its just been added to their list
      default:
        categorisedBooks.toRead.push(book);
    }
  });
  console.log('Categorised books:');
  console.log(categorisedBooks);
  return categorisedBooks;
};
