import { useQuery } from '@tanstack/react-query';
import { supbaseGetCurrentUser } from '../../../services/supabase/apiAuth';

export const useUser = () => {
  // cache current user so it doesn't need to be redownlaoded each time
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: supbaseGetCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
};
