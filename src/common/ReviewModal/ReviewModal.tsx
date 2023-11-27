import { FormEvent, useContext, useState } from 'react';
import { useAddReview } from '../../modules/booksList/hooks/useAddReview';
import { useUser } from '../../modules/auth/hooks/useUser';
import Button from '../Button/Button';
import { ModalContext } from './ModalProvider';

const ReviewModal = () => {
  const { isModalOpen, reviewData, closeModal } = useContext(ModalContext);
  const { book_id, rating } = reviewData;
  const [reviewValue, setReviewValue] = useState(reviewData.comment); // default value not working with just destructuring comment from reviewData for some reason

  const { addReview, isAddingReview } = useAddReview();
  const { user } = useUser();
  const user_id = user?.id ?? '';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addReview(
      { comment: reviewValue ?? '', book_id, rating: rating, user_id },
      { onSuccess: () => closeModal() },
    );
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-primary p-5 rounded-lg shadow-xl w-[400px] h-[510px]">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <div className="mb-1">
            <label
              className="block text-ternary text-sm font-bold mb-2"
              htmlFor="input"
            >
              Your thoughts...
            </label>
            <textarea
              value={reviewValue ?? ''}
              onChange={(e) => setReviewValue(e.currentTarget.value)}
              className="shadow appearance-none border rounded w-full h-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="input"
            >
              {reviewValue}
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
