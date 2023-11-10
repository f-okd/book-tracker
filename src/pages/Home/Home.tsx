import { SyntheticEvent, useState } from 'react';
import SearchBar from '../../common/SearchBar/SearchBar';
import SearchResults from './SearchResults';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  return (
    <main className="bg-primary border-solid border-4 border-ternary flex-1 flex flex-col justify-center items-center pt-1/3 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Enter book name...</h1>
      <SearchBar value={searchValue} onChange={handleChange} />
      {searchValue.length > 3 && <SearchResults />}
    </main>
  );
};

export default Home;
