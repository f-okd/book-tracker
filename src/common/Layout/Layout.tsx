import { Outlet, useNavigation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Header from './Header';

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';


  return !isLoading ? (
    <>
      <Header/>
      <Outlet />
    </>
  ) : <Loader />;
};

export default Layout;
