// We wrap the entire app in a protected rout component
import { ReactNode, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import Loader from '../../../common/Loader/Loader';
import { useNavigate } from 'react-router-dom';

interface IProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3. While loading, show a spinner
  if (isLoading) return <Loader />;

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
