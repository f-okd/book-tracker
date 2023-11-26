import { statusType } from './BookListPage';

const Review = ({
  comment,
  status,
}: {
  comment: string | null;
  status: statusType;
}) => {
  if (status != 'read') return null;
  return (
    <div>
      <p className="text-2xl text-ternary ">Review:</p>
      {comment && <p className="italic">{comment}</p>}
      {!comment && (
        <p className="italic">
          You haven't reviewed left a review for this book yet
        </p>
      )}
    </div>
  );
};

export default Review;
