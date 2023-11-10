import { Outlet, useNavigation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Header from './Header';

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return !isLoading ? (
    <div className="flex flex-col flex-1">
      <Header />
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
};

export default Layout;
