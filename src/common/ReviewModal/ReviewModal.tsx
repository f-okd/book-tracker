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

  console.log(
    `ReviewModal.tsx| Comment:${reviewData.comment}, Rating:${reviewData.rating}`,
  );

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
    <div className="fixed inset-0 bg-gray bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-primary p-5 rounded-3xl shadow-xl w-[400px] h-[560px]">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <div className="mb-1">
            <label
              className="block text-ternary text-sm font-bold mb-2"
              htmlFor="input"
            >
              Your thoughts...
            </label>
            <StarRating
              defaultRating={ratingInputValue} // this is not updating
              onSetRating={setRatingInputValue}
            />
            <textarea
              value={reviewInputValue ?? ''}
              onChange={(e) => setReviewInputValue(e.currentTarget.value)}
              className="shadow appearance-none border rounded-3xl w-full h-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="input"
            >
              {reviewInputValue}
            </textarea>
          </div>
          <div className="flex justify-end">
            <Button type="small" disabled={isAddingReview} onClick={closeModal}>
              Cancel
            </Button>
            <Button type="small" disabled={isAddingReview}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
