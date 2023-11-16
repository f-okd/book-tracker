/*
  BookListPage.tsx
  - Acts as "middleware" between db/server and the booklist that will be displayed
  - Attempts to fetch all the book records for a user
  - Manages the state of the status filter which is used to control which books to display in the list depending on status
    - "toRead" | "reading" | "read" | "dnf"
  - Mininav navbar contains the actual buttons used to mutate local status filter state
  - BookList component takes in status filter and all books fetched from db and renders accordingly 
*/

import { useState } from 'react';
import Mininav from './Mininav';
import BookList from './BookList';
import { getBooksFromDb } from '../../../services/supabase/apiBooks';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../common/Loader/Loader';
import Error from '../../../common/Error/Error';

export type statusType = 'read' | 'reading' | 'dnf' | 'toRead' | '';
//fetch book status records from db UserBooks table, categorise them, then load them in their respective components
// fields: id:int8, created_at: timestamptz, user:uuid, bookid:text, status:text (| "read" | "reading" | "toRead" | "dnf"), date_completed:timestampz
const BookListPage = () => {
  const [statusFilter, setStatusFilter] = useState<statusType>('');

  const handleSetStatustFilter = (status: statusType) => {
    console.log('changing status to:' + status);
    setStatusFilter(status);
  };
  const {
    data: books,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooksFromDb,
  });

  console.log(books);

  if (error)
    return (
      <Error message="Something went wrong fetching your books \n Try again in a few hours or message the administrator at oluwafayefunmiokude@gmail.com" />
    );

  return isLoading ? (
    <Loader />
  ) : (
    <main className="bg-primary border-solid border-4 border-ternary flex-1 flex flex-col justify-top items-center pt-1/3 min-h-screen">
      <Mininav toggleSetFilterBy={handleSetStatustFilter} />
      {statusFilter && (
        <BookList statusToFilterBy={statusFilter} books={books} />
      )}
    </main>
  );
};

export default BookListPage;
