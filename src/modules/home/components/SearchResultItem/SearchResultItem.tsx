/*
  Card component for a single book record from the search results
*/

import Button from '../../../../common/Button/Button';
import { IBook } from '../../../../utils/types';

interface ISearchResultItem {
  book: IBook;
}

const SearchResultItem = ({ book }: ISearchResultItem) => {
  return (
    <div
      data-testid="searchResultItem"
      key={book.id}
      className="solid mx-4 mb-1 flex flex-row items-center rounded-xl border bg-secondary p-1"
      id="bookPreview"
    >
      <img
        data-testid="bookPreviewImage"
        className="mr-2 w-[50px] md:w-[100px]"
        id="bookPreviewImage"
        src={book.smallThumbnail ?? 'bookNotFound.png' ?? undefined}
        alt={`Book Thumbail for ${book.title}`}
      />

      <div className="flex flex-col" id="bookPreviewDescription">
        <p data-testid="bookTitle" className="font-semibold md:text-lg">
          {book.title}
        </p>
        <p data-testid="bookAuthors" className="text-xs italic md:text-sm">
          {book.authors && book.authors.length > 0
            ? book.authors.slice(0, 2).join(', ')
            : 'no authors listed'}
        </p>
        <Button type="small" to={`/book/${book.id}`}>
          View
        </Button>
      </div>
    </div>
  );
};

export default SearchResultItem;
