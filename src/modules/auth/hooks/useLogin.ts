import { useMutation } from '@tanstack/react-query';
import {
  ICredentials,
  supabaseLogin,
} from '../../../services/supabase/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }: ICredentials) =>
      supabaseLogin({ email, password }),
    onSuccess: () => {
      navigate('/');
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error('Email or password is incorrect');
    },
  });

  return { login, isLoggingIn };
};
