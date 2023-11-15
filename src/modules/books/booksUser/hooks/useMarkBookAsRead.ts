import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { supabaseMarkBookAsRead } from '../../../../services/supabase/apiBooks';

export const useMarkBookAsRead = () => {
  const queryClient = useQueryClient();
  const { status: isMarkingBookAsRead, mutate: markBookAsRead } = useMutation({
    mutationFn: supabaseMarkBookAsRead,
    onSuccess: () => {
      toast.success('Book successfully marked as read');
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: () => toast.error('Error marking book as read'),
  });

  return { isMarkingBookAsRead, markBookAsRead };
};
