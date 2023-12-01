import { useMutation } from '@tanstack/react-query';
import { supabaseSignUp } from '../../../services/supabase/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: supabaseSignUp,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address",
      );
      navigate('/', { replace: true });
    },
  });

  return { signUp, isSigningUp };
};
