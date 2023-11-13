import supabase from './supabase';
import { Database } from '../../../types/supabase';

type ReviewsRecord = Database['public']['Tables']['Reviews']['Row'];

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
