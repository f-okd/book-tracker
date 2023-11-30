/*
  Home page
    - manages state of search results - will only be 8 cards at a time
    - stores the state of searchValue which is controlled by the searchbar element
*/

import { SyntheticEvent, useCallback, useState } from 'react';

import { IBook } from '../../../utils/types';

import Search from './Search';
import SearchBar from './SearchBar/SearchBar';
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
    <main className="pt-1/3 flex min-h-screen flex-1 flex-col items-center justify-center border-4 border-solid border-ternary bg-primary">
      <h1 className="mb-4 text-xl font-bold">Enter book name...</h1>

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
