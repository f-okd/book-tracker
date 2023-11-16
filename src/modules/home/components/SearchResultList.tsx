/*
  - Container for search results retrieved from googlebooksapi request
  - maps through search results and returns a card component to present the book in
*/

import { IBook } from '../../../utils/types';
import SearchResultItem from './SearchResultItem';

interface ISearchResults {
  searchResults: IBook[];
}

const SearchResultList = ({ searchResults }: ISearchResults) => {
  return (
    <div className="flex flex-col w-[90%] sm:w-[60%]">
      {searchResults.map((searchResult) => (
        <SearchResultItem key={searchResult.id} book={searchResult} />
      ))}
    </div>
  );
};

export default SearchResultList;
