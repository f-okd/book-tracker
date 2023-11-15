import { useFetcher, useNavigate } from 'react-router-dom';
import { ReviewsRecord } from '../../../../services/supabase/apiBooks';
import { IBook } from '../../../../utils/types';
import Loader from '../../../../common/Loader/Loader';
import { useEffect } from 'react';
import { statusType } from './BookListPage';
import Button from '../../../../common/Button/Button';
import { useMarkBookAsDropped } from '../hooks/useDropBook';
import { useMarkBookAsRead } from '../hooks/useMarkBookAsRead';
import { useMarkBookAsReading } from '../hooks/useMarkBookAsReading';
import { useRemoveBookFromList } from '../hooks/useRemoveBookFromList';

const BookPreview = ({
  book,
  status,
}: {
  book: ReviewsRecord;
  status: statusType;
}) => {
  const fetcher = useFetcher<IBook>();
  const navigate = useNavigate();
  const { isDroppingBook, dropBook } = useMarkBookAsDropped();
  const { isMarkingBookAsRead, markBookAsRead } = useMarkBookAsRead();
  const { isMarkingBookAsReading, markBookAsReading } = useMarkBookAsReading();
  const { isRemovingBook, removeBookFromList } = useRemoveBookFromList();

  const isLoading =
    isDroppingBook === 'pending' ||
    isMarkingBookAsRead === 'pending' ||
    isMarkingBookAsReading === 'pending' ||
    isRemovingBook === 'pending';

  useEffect(() => {
    fetcher.load(`/book/${book.book_id}`);
    // todo: refactor You realllly shouldn't do this but alas here we are, i dont believer this fetcher needs to be in dependancy array because its use is very limited
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book.book_id]);

  if (fetcher.state === 'loading') return <Loader />;
  if (fetcher.state === 'idle' && !fetcher.data)
    return <div>No data found</div>;

  if (fetcher.data) {
    const bookData = fetcher.data;
    console.log(status);
    return (
      <div
        id="bookCard"
        className="flex flex-col bg-secondary p-1 w-[100px] h-[150px] sm:w-[150px] sm:h-[250px] rounded-3xl border border-ternary hover:cursor-pointer"
      >
        <img
          className="self-center border border-ternary rounded-xl mb-1"
          src={bookData.thumbnail ?? 'bookNotFound.png'}
          alt={`Cover of the book: ${bookData.title}`}
          onClick={() => navigate(`/book/${bookData.id}`)}
        />
        <p className="text-base font-semibold mb-2">{bookData.title}</p>
        <Button
          type="ternary"
          disabled={isLoading}
          onClick={() => removeBookFromList(book.book_id)}
        >
          Remove
        </Button>
        {status === 'reading' ? (
          <>
            <Button
              type="ternary"
              disabled={isLoading}
              onClick={() => markBookAsRead(book.book_id)}
            >
              Mark read
            </Button>
            <Button
              type="ternary"
              disabled={isLoading} // todo:// check for other loading status'
              onClick={() => dropBook(book.book_id)}
            >
              Mark dropped
            </Button>
          </>
        ) : status === ('toRead' || 'dnf') ? (
          <Button
            type="ternary"
            disabled={isLoading}
            onClick={() => markBookAsReading(book.book_id)}
          >
            Mark reading
          </Button>
        ) : (
          // need to complete the ternary with something
          ''
        )}
      </div>
    );
  }
};

export default BookPreview;
