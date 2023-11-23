import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supbaseLogout } from '../../../services/supabase/apiAuth';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: supbaseLogout,
    onSuccess: () => {
      navigate('/login', { replace: true });
      queryClient.invalidateQueries();
    },
  });

  return { logout, isLoggingOut };
};
