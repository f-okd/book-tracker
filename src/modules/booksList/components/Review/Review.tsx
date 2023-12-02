import RenderStars from '../../utils/RenderStars';
import { statusType } from '../BookListPage';

interface IReview {
  comment: string | null;
  status: statusType;
  rating: number | null;
}

const Review = ({ comment, status, rating }: IReview) => {
  if (status != 'read') return null;
  return (
    <div>
      <p className="text-2xl text-ternary ">Review:</p>
      {rating && <RenderStars rating={rating} />}
      {comment && (
        <p data-testid="reviewComment" className="italic">
          {comment}
        </p>
      )}
      {!comment && (
        <p data-testid="errorMessage" className="italic">
          You haven't left a review for this book yet
        </p>
      )}
    </div>
  );
};

export default Review;
