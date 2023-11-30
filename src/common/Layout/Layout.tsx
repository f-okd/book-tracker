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
      <div className="flex flex-1 flex-col">
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
