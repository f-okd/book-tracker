/*
  Abstract react query mutation function for marking books as "dnf" in the database
*/

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { supabaseMarkBookAsDropped } from '../../../services/supabase/apiBooks';

export const useMarkBookAsDropped = () => {
  const queryClient = useQueryClient();
  const { status: isDroppingBook, mutate: dropBook } = useMutation({
    mutationFn: supabaseMarkBookAsDropped,
    onSuccess: () => {
      toast.success('Book successfully dropped');
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: () => toast.error('Error dropping book'),
  });

  return { isDroppingBook, dropBook };
};

// INCOMPLETE
