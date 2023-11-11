import { SyntheticEvent, useCallback, useState } from 'react';

import { IBook } from '../../../../utils/types';

import Search from '../../search/components/Search';
import SearchBar from '../../../../common/SearchBar/SearchBar';
import SearchResultList from '../../search/components/SearchResultList';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<IBook[]>([]);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  // memoize this because it gets redefined every time Home component is rerendered
  // which happens to be everytime the user query changes
  const handleSetSearchResults = useCallback((books: IBook[]) => {
    setSearchResults(books);
  }, []); // Empty dependency array indicates this function will be memoized until the component unmounts

  return (
    <main className="bg-primary border-solid border-4 border-ternary flex-1 flex flex-col justify-center items-center pt-1/3 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Enter book name...</h1>

      <Search
        value={searchValue}
        handleSetSearchResults={handleSetSearchResults}
      >
        <SearchBar value={searchValue} onChange={handleChange} />
      </Search>
      {searchResults && <SearchResultList searchResults={searchResults} />}
    </main>
  );
};

export default Home;
