import { useState } from 'react';
import Mininav from './Mininav';
import BookList from './BookList';
import { getBooksFromDb } from '../../../../services/supabase/apiBooks';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../common/Loader/Loader';
import Error from '../../../../common/Error/Error';

export type statusType = 'read' | 'reading' | 'dnf' | 'toRead' | '';
//fetch book status records from db UserBooks table, categorise them, then load them in their respective components
// fields: id:int8, created_at: timestamptz, user:uuid, bookid:text, status:text (| "read" | "reading" | "toRead" | "dnf"), date_completed:timestampz
const BookListPage = () => {
  const [statusFilter, setStatusFilter] = useState<statusType>('');

  const handleSetStatustFilter = (status: statusType) => {
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
    <main className="bg-primary border-solid border-4 border-ternary flex-1 flex flex-row justify-center items-center pt-1/3 min-h-screen">
      <Mininav toggleSetFilterBy={handleSetStatustFilter} />
      {statusFilter && <BookList status={statusFilter} books={books} />}
    </main>
  );
};

export default BookListPage;
