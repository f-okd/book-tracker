import { SyncLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="bg-white fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-primary">
      <SyncLoader />
    </div>
  );
};

export default Loader;
