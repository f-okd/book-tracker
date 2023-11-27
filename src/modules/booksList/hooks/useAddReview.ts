import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseAddReview } from '../../../services/supabase/apiBooks';
import toast from 'react-hot-toast';

export const useAddReview = () => {
  const queryClient = useQueryClient();
  const { mutate: addReview, isPending: isAddingReview } = useMutation({
    mutationFn: supabaseAddReview,
    onSuccess: () => {
      toast.success('successfully added review');
      queryClient.invalidateQueries({ queryKey: ['currentBook'] });
    },
    onError: () => toast.error('Something went wrong 🙁'),
  });

  return { addReview, isAddingReview };
};
