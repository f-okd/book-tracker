import { Database } from '../../../../../types/supabase';

interface IDidNotFinish {
  books: Database['public']['Tables']['UserBooks']['Row'][];
}

const DidNotFinish = ({ books }) => {
  return <div>DidNotFinish</div>;
};

export default DidNotFinish;
