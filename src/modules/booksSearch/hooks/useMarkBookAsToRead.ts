import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { supabaseMarkBookAsToRead } from '../../../services/supabase/apiBooks';

export const useMarkBookAsToRead = () => {
  const queryClient = useQueryClient();
  const { status: isMarkingToRead, mutate: markAsToRead } = useMutation({
    mutationFn: supabaseMarkBookAsToRead,
    onSuccess: () => {
      toast.success('Book successfully added to list');
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: () => toast.error('Error adding book to list'),
  });

  return { isMarkingToRead, markAsToRead };
};
