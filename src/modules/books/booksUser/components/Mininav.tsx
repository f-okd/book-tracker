import Button from '../../../../common/Button/Button';
import { statusType } from './BookListPage';

interface IMininav {
  toggleSetFilterBy: (status: statusType) => void;
}

const Mininav = ({ toggleSetFilterBy }: IMininav) => {
  return (
    <>
      <Button type="ternary" onClick={() => toggleSetFilterBy('reading')}>
        Reading
      </Button>
      <Button type="ternary" onClick={() => toggleSetFilterBy('toRead')}>
        To read list
      </Button>
      <Button type="ternary" onClick={() => toggleSetFilterBy('read')}>
        Finished
      </Button>
      <Button type="ternary" onClick={() => toggleSetFilterBy('dnf')}>
        Did not finish
      </Button>
    </>
  );
};

export default Mininav;
