const RenderStars = ({ rating }: { rating: number }) => {
  if (rating == 0) return <></>;
  return (
    <span>
      {Array.from(Array(rating), () => {
        return '⭐';
      })}
    </span>
  );
};
export default RenderStars;
