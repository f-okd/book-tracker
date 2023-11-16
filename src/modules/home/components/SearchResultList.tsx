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
