import { useEffect, useState } from 'react';
import Star from './Star';
interface IStarRating {
  defaultRating: number | null;
  onSetRating: (n: number | null) => void;
}

const StarRating = ({ defaultRating, onSetRating }: IStarRating) => {
  const [rating, setRating] = useState(defaultRating); //remote rating value
  const [tempRating, setTempRating] = useState(0);

  // The component seems to be mounted before the value is available, so we add this useEffect to account for it
  // Issue also occurs in ReviewModal.tsx
  useEffect(() => {
    setRating(defaultRating);
  }, [defaultRating]);

  const handleSetRating = (rating: number) => {
    setRating(rating); // update local rating value
    onSetRating(rating); //update rating value in modal, so it can be used to update remote rating value
  };
  return (
    <div className="flex items-center gap-[5px]">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : (rating ?? 0) >= i + 1} // fill in star if rating is > than its index
            onRate={() => handleSetRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
