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

export interface IButtonOptions {
  bookStatus: statusType;
  book_id: string;
  book_title: string;
  comment: string | null;
  openModal: (comment: string, book_id: string, rating: number) => void;
  rating: number | null;
}

const ButtonOptions = ({
  bookStatus,
  book_id,
  book_title,
  comment,
  rating,
  openModal,
}: IButtonOptions) => {
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
            data-testid="markReadButton"
            type="ternary"
            disabled={isLoading}
            onClick={() => markBookAsRead({ user_id, book_id })}
          >
            Mark read
          </Button>
          <Button
            data-testid="markDroppedButton"
            type="ternary"
            disabled={isLoading}
            onClick={() => dropBook({ book_id, user_id })} //TODO: TAKE USER_ID
          >
            Mark dropped
          </Button>
          <Button
            data-testid="removeButton"
            type="ternary"
            disabled={isLoading}
            onClick={() => removeBookFromList({ book_id, user_id })}
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
            data-testid="markReadingButton"
            type="ternary"
            disabled={isLoading}
            onClick={() => markBookAsReading({ book_id, user_id })}
          >
            Mark reading
          </Button>
          <Button
            data-testid="removeButton"
            type="ternary"
            disabled={isLoading}
            onClick={() => removeBookFromList({ book_id, user_id })}
          >
            Remove
          </Button>
        </>
      );
    case 'read':
      if (!comment || !rating)
        return (
          <Button
            data-testid="addReviewButton"
            type="ternary"
            disabled={isLoading}
            onClick={() => openModal(comment ?? '', book_id, rating ?? 0)}
          >
            Add a review
          </Button>
        );
      return (
        <Button
          data-testid="editReviewButton"
          type="ternary"
          disabled={isLoading}
          onClick={() => openModal(comment ?? '', book_id, rating ?? 0)}
        >
          Edit review
        </Button>
      );
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
