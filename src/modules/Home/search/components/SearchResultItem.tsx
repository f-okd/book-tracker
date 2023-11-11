import Button from '../../../../common/Button/Button';
import { IBook } from '../../../../utils/types';

interface ISearchResultItem {
  book: IBook;
}

const SearchResultItem = ({ book }: ISearchResultItem) => {
  return (
    <div
      key={book.id}
      className="flex flex-row items-center border solid p-1 mb-1 mx-4 rounded-xl bg-secondary"
      id="bookPreview"
    >
      <img
        className="mr-2 w-[50px] md:w-[100px]" // Add margin to the right of the image
        id="bookPreviewImage"
        src={book.smallThumbnail ?? 'bookNotFound.png' ?? undefined}
      />

      <div className="flex flex-col" id="bookPreviewDescription">
        <p className="font-semibold md:text-lg">{book.title}</p>
        <p className="text-xs italic md:text-sm">
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
