import { IBook } from '../../../../utils/types';
import SearchResultItem from './SearchResultItem';

interface ISearchResults {
  searchResults: IBook[];
}

const SearchResultList = ({ searchResults }: ISearchResults) => {
  // return searchResults.map((book: IBook) => <p key={book.id}>{book.title}</p>);
  return (
    <div className="flex flex-col">
      {searchResults.map((searchResult) => (
        <SearchResultItem book={searchResult} />
      ))}
    </div>
  );
};

export default SearchResultList;
