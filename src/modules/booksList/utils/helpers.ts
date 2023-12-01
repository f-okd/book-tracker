export const shortenTitle = (title: string): string => {
  if (title.length < 21) return title;
  return title.substring(0, 21) + '...';
};
