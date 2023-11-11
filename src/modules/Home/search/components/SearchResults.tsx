import { IBook } from '../../../../utils/types';

interface ISearchResults {
  searchResults: IBook[];
}

const SearchResults = ({ searchResults }: ISearchResults) => {
  return searchResults.map((book: IBook) => <p key={book.id}>{book.title}</p>);
};

export default SearchResults;
