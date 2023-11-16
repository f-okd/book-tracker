import { SyntheticEvent, useCallback, useState } from 'react';

import { IBook } from '../../../utils/types';

import Search from './Search';
import SearchBar from '../../../common/SearchBar/SearchBar';
import SearchResultList from './SearchResultList';
import Loader from '../../../common/Loader/Loader';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  const toggleIsLoading = useCallback((bool: boolean) => {
    setIsLoading(bool);
  }, []);

  // Memoize this because it gets redefined every time Home component is rerendered
  // The useEffect hook in Search.tsx will enter an infinite loop without it
  const handleSetSearchResults = useCallback((books: IBook[]) => {
    setSearchResults(books);
  }, []);

  return (
    <main className="bg-primary border-solid border-4 border-ternary flex-1 flex flex-col justify-center items-center pt-1/3 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Enter book name...</h1>

      <Search
        value={searchValue}
        handleSetSearchResults={handleSetSearchResults}
        toggleIsLoading={toggleIsLoading}
      >
        <SearchBar value={searchValue} onChange={handleChange} />
      </Search>
      {searchResults && isLoading ? (
        <Loader />
      ) : (
        <SearchResultList searchResults={searchResults} />
      )}
    </main>
  );
};

export default Home;
