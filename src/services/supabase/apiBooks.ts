import supabase from './supabase';
import { Database } from '../../types/supabase';

export type ReviewsRecord = Database['public']['Tables']['Reviews']['Row'];

export interface AllBooksByStatus {
  read: ReviewsRecord[];
  reading: ReviewsRecord[];
  toRead: ReviewsRecord[];
  dnf: ReviewsRecord[];
}

export const supabaseGetBookFromDb = async (
  book_id: string,
): Promise<ReviewsRecord[]> => {
  const query = supabase.from('Reviews').select('*').eq('book_id', book_id);
  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Error marking book as reading');
  }

  return data as ReviewsRecord[];
};

export const getBooksFromDb = async (
  user_id: string,
): Promise<AllBooksByStatus> => {
  let reading: ReviewsRecord[] = [];
  let read: ReviewsRecord[] = [];
  let toRead: ReviewsRecord[] = [];
  let dnf: ReviewsRecord[] = [];

  try {
    const readingResult = await supabase
      .from('Reviews')
      .select('*')
      .eq('user_id', user_id)
      .eq('status', 'reading');
    reading = readingResult.data || [];

    const readResult = await supabase
      .from('Reviews')
      .select('*')
      .eq('status', 'read')
      .eq('user_id', user_id);
    read = readResult.data || [];

    const toReadResult = await supabase
      .from('Reviews')
      .select('*')
      .eq('status', 'toRead')
      .eq('user_id', user_id);
    toRead = toReadResult.data || [];

    const dnfResult = await supabase
      .from('Reviews')
      .select('*')
      .eq('status', 'dnf')
      .eq('user_id', user_id);
    dnf = dnfResult.data || [];
  } catch (error) {
    console.error(
      'src/services/supabaseapiBooks.ts error fetching from db',
      error,
    );
  }

  return { reading, read, toRead, dnf };
};

interface IAddToList {
  book_id: string;
  book_title: string;
  user_id: string;
}
export const supabaseMarkBookAsToRead = async ({
  book_id,
  book_title,
  user_id,
}: IAddToList) => {
  const { error } = await supabase.from('Reviews').insert({
    book_id,
    user_id,
    book_title,
  });

  if (error) {
    console.error(error);
    throw new Error('Error marking book as reading');
  }
};

interface IUserBook {
  book_id: string;
  user_id: string;
}
export const supabaseMarkBookAsReading = async ({
  book_id,
  user_id,
}: IUserBook) => {
  const { error } = await supabase
    .from('Reviews')
    .update({ status: 'reading' })
    .eq('book_id', book_id)
    .eq('user_id', user_id);

  if (error) {
    console.error(error);
    throw new Error('Error marking book as reading');
  }
};

export const supabaseMarkBookAsRead = async ({
  book_id,
  user_id,
}: IUserBook) => {
  const { error } = await supabase
    .from('Reviews')
    .update({ status: 'read' })
    .eq('book_id', book_id)
    .eq('user_id', user_id);

  if (error) {
    console.error(error);
    throw new Error('Error marking book as read');
  }
};

export const supabaseMarkBookAsDropped = async ({
  book_id,
  user_id,
}: IUserBook) => {
  const { error } = await supabase
    .from('Reviews')
    .update({ status: 'dnf' })
    .eq('book_id', book_id)
    .eq('user_id', user_id);

  if (error) {
    console.error(error);
    throw new Error('Error marking book as dropped');
  }
};

export const supabaseRemoveBookFromList = async ({
  book_id,
  user_id,
}: IUserBook) => {
  const { error } = await supabase
    .from('Reviews')
    .delete()
    .eq('book_id', book_id)
    .eq('user_id', user_id);

  if (error) {
    console.error(error);
    throw new Error('Error removing book from list');
  }
};

interface ISupabaseAddReview {
  book_id: string;
  rating: number | null;
  comment: string | null;
  user_id: string;
}
export const supabaseAddReview = async ({
  book_id,
  rating,
  comment,
  user_id,
}: ISupabaseAddReview) => {
  const { error } = await supabase
    .from('Reviews')
    .update({ rating, comment })
    .eq('book_id', book_id)
    .eq('user_id', user_id);

  if (error) {
    console.error(error);
    throw new Error('Error adding review');
  }
};
