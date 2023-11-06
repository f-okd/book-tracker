import { Outlet, useNavigation } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      {isLoading && <Loader />}

      <nav></nav>
      <Outlet />
    </>
  );
};

export default Layout;
