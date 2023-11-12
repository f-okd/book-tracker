import { useQuery } from '@tanstack/react-query';
import { getBooksFromDb } from '../../../../services/supabase/apiBooks';

const BookListPage = () => {
  const {
    data: books,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooksFromDb,
  });

  console.log(books);
  return <div>{isLoading ? 'Loading' : 'List of data'}</div>;
};

export default BookListPage;
