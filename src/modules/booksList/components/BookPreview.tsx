/*
  - This component is a mini book card component displayed in the users "reading list" 
  - BookList.tsx component iteratively calls this to generate a subset of the user's entire reading list 
  
  - It takes in a book object all books with this status will be rendered 
*/

import { useFetcher, useNavigate } from 'react-router-dom';
import { ReviewsRecord } from '../../../services/supabase/apiBooks';
import { IBook } from '../../../utils/types';
import Loader from '../../../common/Loader/Loader';
import { useContext, useEffect } from 'react';
import { statusType } from './BookListPage';
import ButtonOptions from '../../../common/ButtonOptions/ButtonOptions';
import { ModalContext } from '../../../common/ReviewModal/ModalProvider';
import RenderStars from '../utils/RenderStars';
import { shortenTitle } from '../utils/helpers';

interface IBookPreview {
  book: ReviewsRecord;
}
const BookPreview = ({ book }: IBookPreview) => {
  const fetcher = useFetcher<IBook>();
  const navigate = useNavigate();

  const { openModalWithReview } = useContext(ModalContext);

  useEffect(() => {
    /* 
      "/book/book_id" route has a loader that fetches book data from the google books api
      we use the fetcher from useFetcher hook of react-router to fetch data loaded in a route without navigating to that route
    */
    fetcher.load(`/book/${book.book_id}`);

    /*
      todo: refactor -> fetcher SHOULD be in dependancy array but i can't figure out how to memoize it or work around this
      I decided to remove fetcher object from dependancy array because its use is very limited, (this is why you shouldn't use useEffect btw)
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book.book_id]);

  /* 
    Error handling: We dont render the component unless the books were (successfully) fetched
  */
  if (fetcher.state === 'loading') return <Loader />;

  if (fetcher.state === 'idle' && !fetcher.data)
    return <div>No data found</div>;

  if (fetcher.data) {
    const bookData = fetcher.data;
    return (
      <div className="m-2 flex h-[420px] w-[220px] flex-col rounded-3xl border border-ternary bg-secondary p-2 hover:cursor-pointer">
        <img
          className="mb-1 h-[240px] w-[180px] self-center rounded-xl border border-ternary"
          src={bookData.thumbnail ?? 'bookNotFound.png'}
          alt={`Cover of the book: ${bookData.title}`}
          onClick={() => navigate(`/book/${bookData.id}`)}
        />
        <p className="text-l mb-2 font-semibold">
          {shortenTitle(bookData.title)}
        </p>
        <RenderStars rating={book.rating ?? 0} />
        <ButtonOptions
          bookStatus={book.status as statusType}
          book_title={book.book_title}
          book_id={book.book_id}
          comment={book.comment}
          rating={book.rating}
          openModal={openModalWithReview}
        />
      </div>
    );
  }
};

export default BookPreview;
