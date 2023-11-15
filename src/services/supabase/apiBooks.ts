import supabase from './supabase';
import { Database } from '../../types/supabase';

export type ReviewsRecord = Database['public']['Tables']['Reviews']['Row'];

export interface AllBooksByStatus {
  read: ReviewsRecord[];
  reading: ReviewsRecord[];
  toRead: ReviewsRecord[];
  dnf: ReviewsRecord[];
}

export const getBooksFromDb = async (): Promise<AllBooksByStatus> => {
  let reading: ReviewsRecord[] = [];
  let read: ReviewsRecord[] = [];
  let toRead: ReviewsRecord[] = [];
  let dnf: ReviewsRecord[] = [];

  try {
    const readingResult = await supabase
      .from('Reviews')
      .select('*')
      .eq('status', 'reading');
    reading = readingResult.data || [];

    const readResult = await supabase
      .from('Reviews')
      .select('*')
      .eq('status', 'read');
    read = readResult.data || [];

    const toReadResult = await supabase
      .from('Reviews')
      .select('*')
      .eq('status', 'toRead');
    toRead = toReadResult.data || [];

    const dnfResult = await supabase
      .from('Reviews')
      .select('*')
      .eq('status', 'dnf');
    dnf = dnfResult.data || [];
  } catch (error) {
    console.error(
      'src/services/supabaseapiBooks.ts error fetching from db',
      error,
    );
  }

  return { reading, read, toRead, dnf };
};

export const supabaseMarkBookAsToRead = async ({
  book_id,
  book_title,
}: {
  book_id: string;
  book_title: string;
}) => {
  // upsert will only make a record if it doesnt already exist
  const { error } = await supabase.from('Reviews').insert({
    book_id,
    user_id: '35c8ce94-e7ae-4161-9911-c56bbc5f7db3',
    book_title,
  });

  if (error) {
    console.error(error);
    throw new Error('Error marking book as reading');
  }
};

export const supabaseMarkBookAsReading = async (book_id: string) => {
  const { error } = await supabase
    .from('Reviews')
    .update({ status: 'reading' })
    .eq('book_id', book_id);

  if (error) {
    console.error(error);
    throw new Error('Error marking book as reading');
  }
};

export const supabaseMarkBookAsRead = async (book_id: string) => {
  const { error } = await supabase
    .from('Reviews')
    .update({ status: 'read' })
    .eq('book_id', book_id);

  if (error) {
    console.error(error);
    throw new Error('Error marking book as read');
  }
};

export const supabaseMarkBookAsDropped = async (book_id: string) => {
  const { error } = await supabase
    .from('Reviews')
    .update({ status: 'dnf' })
    .eq('book_id', book_id);

  if (error) {
    console.error(error);
    throw new Error('Error marking book as dropped');
  }
};

export const supabaseRemoveBookFromList = async (book_id: string) => {
  const { error } = await supabase
    .from('Reviews')
    .delete()
    .eq('book_id', book_id);

  if (error) {
    console.error(error);
    throw new Error('Error removing book from list');
  }
};

export const supabaseAddReview = async ({
  book_id,
  rating,
  comment,
}: {
  book_id: string;
  rating: number;
  comment: string;
}) => {
  const { error } = await supabase
    .from('Reviews')
    .update({ status: 'dnf', rating, comment })
    .eq('book_id', book_id);

  if (error) {
    console.error(error);
    throw new Error('Error adding review');
  }
};
