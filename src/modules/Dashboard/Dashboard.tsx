import { useEffect } from 'react';
import { getBooksFromDb } from '../../services/supabase/apiBooks';

const Dashboard = () => {
  useEffect(() => {
    getBooksFromDb().then((reviews) => console.log(reviews));
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
