const RenderStars = ({ rating }: { rating: number }) => {
  if (rating == 0) return <></>;
  return (
    <span data-testid={`rating-${rating}`}>
      {Array.from(Array(rating), () => {
        return '⭐';
      })}
    </span>
  );
};
export default RenderStars;
