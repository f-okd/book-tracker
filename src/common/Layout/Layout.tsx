import { Outlet, useNavigation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Header from './Header';
import { ModalProvider } from '../ReviewModal/ModalProvider';
import ReviewModal from '../ReviewModal/ReviewModal';

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return !isLoading ? (
    <ModalProvider>
      <div className="flex flex-col flex-1">
        <Header />
        <Outlet />
        <ReviewModal />
      </div>
    </ModalProvider>
  ) : (
    <Loader />
  );
};

export default Layout;
