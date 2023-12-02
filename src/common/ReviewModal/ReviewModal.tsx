import { FormEvent, useContext, useEffect, useState } from 'react';
import { useAddReview } from '../../modules/booksList/hooks/useAddReview';
import { useUser } from '../../modules/auth/hooks/useUser';
import Button from '../Button/Button';
import { ModalContext } from './ModalProvider';
import StarRating from '../StarRating/StarRating';
import toast from 'react-hot-toast';

const ReviewModal = () => {
  const { isModalOpen, reviewData, closeModal } = useContext(ModalContext);
  const { book_id, rating, comment } = reviewData;
  const [reviewInputValue, setReviewInputValue] = useState(comment); // default value not working with just destructuring comment from reviewData for some reason
  const [ratingInputValue, setRatingInputValue] = useState(rating);

  // The component seems to be mounted before the value is available, so we add this useEffect to account for it
  useEffect(() => {
    setRatingInputValue(rating);
    setReviewInputValue(comment);
  }, [comment, rating]);

  const { addReview, isAddingReview } = useAddReview();
  const { user } = useUser();
  const user_id = user?.id ?? '';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewInputValue === '' || ratingInputValue === 0) {
      toast.error("You can't submit without values");
      return;
    }
    addReview(
      {
        comment: reviewInputValue ?? '',
        book_id,
        rating: ratingInputValue,
        user_id,
      },
      { onSuccess: () => closeModal() },
    );
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      data-testid="reviewForm"
      className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray bg-opacity-50"
    >
      <div className="h-[560px] w-[400px] rounded-3xl bg-primary p-5 shadow-xl">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <div className="mb-1">
            <label
              className="mb-2 block text-sm font-bold text-ternary"
              htmlFor="input"
            >
              Your thoughts...
            </label>
            <StarRating
              defaultRating={ratingInputValue} // this is not updating
              onSetRating={setRatingInputValue}
            />
            <textarea
              data-testid="commentInput"
              value={reviewInputValue ?? ''}
              onChange={(e) => setReviewInputValue(e.currentTarget.value)}
              className="text-gray-700 focus:shadow-outline h-[400px] w-full appearance-none rounded-3xl border px-3 py-2 leading-tight shadow focus:outline-none"
              id="input"
            >
              {reviewInputValue}
            </textarea>
          </div>
          <div className="flex justify-end">
            <Button
              data-testid="cancelReviewButton"
              type="small"
              disabled={isAddingReview}
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              data-testid="submitReviewButton"
              type="small"
              disabled={isAddingReview}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
