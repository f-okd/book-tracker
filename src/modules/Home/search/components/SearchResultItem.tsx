import { IBook } from '../../../../utils/types';

interface ISearchResultItem {
  book: IBook;
}

const SearchResultItem = ({ book }: ISearchResultItem) => {
  return (
    <div
      className="flex flex-row items-center border solid p-1 mb-1 mx-4 rounded-xl bg-secondary"
      id="bookPreview"
    >
      <img
        className="mr-2" // Add margin to the right of the image
        id="bookPreviewImage"
        width={50} // Adjusted width for better visibility
        src={book.smallThumbnail ?? 'bookNotFound.png' ?? undefined}
      />

      <div className="flex flex-col" id="bookPreviewDescription">
        <p className="font-semibold">{book.title}</p>
        <p className="text-xs italic">
          {book.authors && book.authors.length > 0
            ? book.authors.slice(0, 2).join(', ')
            : 'no authors listed'}
        </p>
      </div>
    </div>
  );
};

export default SearchResultItem;
