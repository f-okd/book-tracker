import { useMutation } from '@tanstack/react-query';
import { supabaseSignUp } from '../../../services/supabase/apiAuth';
import toast from 'react-hot-toast';
export const useSignUp = () => {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: supabaseSignUp,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address",
      );
    },
  });

  return { signUp, isSigningUp };
};
