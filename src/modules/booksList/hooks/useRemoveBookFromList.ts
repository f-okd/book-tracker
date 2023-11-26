/*
  Abstract react query mutation function for removing books from the database
*/

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { supabaseRemoveBookFromList } from '../../../services/supabase/apiBooks';

export const useRemoveBookFromList = () => {
  const queryClient = useQueryClient();
  const { status: isRemovingBook, mutate: removeBookFromList } = useMutation({
    mutationFn: supabaseRemoveBookFromList,
    onSuccess: () => {
      toast.success('Book successfully removed');
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      queryClient.invalidateQueries({
        queryKey: ['currentBook'],
      });
    },
    onError: () => toast.error('Error removing book'),
  });

  return { isRemovingBook, removeBookFromList };
};
