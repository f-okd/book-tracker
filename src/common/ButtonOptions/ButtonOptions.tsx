/*

This renders the button options (Remove from list, mark as read, )

*/

import { useUser } from '../../modules/auth/hooks/useUser';
import { statusType } from '../../modules/booksList/components/BookListPage';
import { useMarkBookAsDropped } from '../../modules/booksList/hooks/useDropBook';
import { useMarkBookAsRead } from '../../modules/booksList/hooks/useMarkBookAsRead';
import { useMarkBookAsReading } from '../../modules/booksList/hooks/useMarkBookAsReading';
import { useRemoveBookFromList } from '../../modules/booksList/hooks/useRemoveBookFromList';
import { useMarkBookAsToRead } from '../../modules/booksSearch/hooks/useMarkBookAsToRead';
import Button from '../Button/Button';

interface IButtonOptions {
  bookStatus: statusType;
  book_id: string;
  book_title: string;
}

const ButtonOptions = ({ bookStatus, book_id, book_title }: IButtonOptions) => {
  const user = useUser().user;
  const user_id = user?.id ?? '';

  const { isDroppingBook, dropBook } = useMarkBookAsDropped();
  const { isMarkingBookAsRead, markBookAsRead } = useMarkBookAsRead();
  const { isMarkingBookAsReading, markBookAsReading } = useMarkBookAsReading();
  const { isRemovingBook, removeBookFromList } = useRemoveBookFromList();
  const { isMarkingToRead, markAsToRead } = useMarkBookAsToRead();

  const isLoading =
    isDroppingBook === 'pending' ||
    isMarkingBookAsRead === 'pending' ||
    isMarkingBookAsReading === 'pending' ||
    isRemovingBook === 'pending' ||
    isMarkingToRead === 'pending';

  switch (bookStatus) {
    case 'reading':
      return (
        <>
          <Button
            type="ternary"
            disabled={isLoading}
            onClick={() => markBookAsRead({ user_id, book_id })}
          >
            Mark read
          </Button>
          <Button
            type="ternary"
            disabled={isLoading}
            onClick={() => dropBook(book_id)}
          >
            Mark dropped
          </Button>
          <Button
            type="ternary"
            disabled={isLoading}
            onClick={() => removeBookFromList(book_id)}
          >
            Remove
          </Button>
        </>
      );
    // want toRead+dnf to render same buttons
    case 'toRead':
    case 'dnf':
      return (
        <>
          <Button
            type="ternary"
            disabled={isLoading}
            onClick={() => markBookAsReading(book_id)}
          >
            Mark reading
          </Button>
          <Button
            type="ternary"
            disabled={isLoading}
            onClick={() => removeBookFromList(book_id)}
          >
            Remove
          </Button>
        </>
      );
    case 'read':
      return (
        <Button
          type="ternary"
          disabled={isLoading}
          onClick={() => alert('removed ' + book_id)}
        >
          Add a review
        </Button>
      );
    case 'reviewed':
      return null;
    // Book not in list yet
    default:
      return (
        <Button
          type="ternary"
          disabled={isMarkingToRead === 'pending'}
          onClick={() =>
            markAsToRead({
              book_id,
              book_title,
              user_id,
            })
          }
        >
          Add to List
        </Button>
      );
  }
};

export default ButtonOptions;