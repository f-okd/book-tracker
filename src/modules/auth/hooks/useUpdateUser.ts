import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseUpdateCurrentUser } from '../../../services/supabase/apiAuth';
import toast from 'react-hot-toast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: supabaseUpdateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Details successfully updated');
    },
    onError: () => toast.error('Something went wrong 🙁'),
  });

  return { updateUser, isUpdatingUser };
};
