import supabase from './supabase';

export const getBooksFromDb = async () => {
  const { data: reviews, error } = await supabase.from('Reviews').select('*');

  if (error) {
    console.error(error);
    throw new Error("Couldn't fetch books from supabase");
  }
  return reviews;
};
