import { SyncLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 bg-primary w-full h-full flex items-center justify-center bg-white z-50">
      <SyncLoader />
    </div>
  );
};

export default Loader;
