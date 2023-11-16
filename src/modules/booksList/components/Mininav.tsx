/*
  This is the navigation bar on the user's "reading list"
  They can filter books by status i.e. only books marked as read will be visible if they click read
*/

import Button from '../../../common/Button/Button';
import { statusType } from './BookListPage';

interface IMininav {
  toggleSetFilterBy: (status: statusType) => void;
}

const Mininav = ({ toggleSetFilterBy }: IMininav) => {
  return (
    <div className="flex flex-row pb-3">
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
    </div>
  );
};

export default Mininav;
