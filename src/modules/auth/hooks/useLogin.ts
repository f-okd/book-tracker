import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ICredentials,
  supabaseLogin,
} from '../../../services/supabase/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }: ICredentials) =>
      supabaseLogin({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error('Email or password is incorrect');
    },
  });

  return { login, isLoggingIn };
};
