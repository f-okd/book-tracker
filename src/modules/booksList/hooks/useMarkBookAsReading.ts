/*
  Abstract react query mutation function for marking books as "reading" in the database
*/

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { supabaseMarkBookAsReading } from '../../../services/supabase/apiBooks';

export const useMarkBookAsReading = () => {
  const queryClient = useQueryClient();
  const { status: isMarkingBookAsReading, mutate: markBookAsReading } =
    useMutation({
      mutationFn: supabaseMarkBookAsReading,
      onSuccess: () => {
        toast.success('Book successfully marked as reading');
        queryClient.invalidateQueries({
          queryKey: ['books'],
        });
        queryClient.invalidateQueries({
          queryKey: ['currentBook'],
        });
      },
      onError: () => toast.error('Error marking book as reading'),
    });

  return { isMarkingBookAsReading, markBookAsReading };
};
