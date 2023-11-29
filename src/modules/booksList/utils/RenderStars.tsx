const RenderStars = ({ rating }: { rating: number }) => {
  if (rating == 0) return <></>;
  return (
    <p>
      {Array.from(Array(rating), () => {
        return <>⭐</>;
      })}
    </p>
  );
};
export default RenderStars;
