import Button from '../../../../common/Button/Button';
import { IBook } from '../../../../utils/types';

interface IBookDetails {
  book: IBook;
}

const BookDetails = ({ book }: IBookDetails) => {
  return (
    <div
      id="bookCard"
      className="flex flex-col bg-secondary p-5 w-[90%] md:w-[60%] rounded-3xl border border-ternary"
    >
      <h2 className="text-3xl font-semibold mb-2">{book.title}</h2>

      <p className="text-sm italic mb-4">
        {book.authors && book.authors.length > 0
          ? book.authors.join(', ')
          : 'No authors listed'}
      </p>

      <img
        className="self-center border border-ternary rounded-xl mb-4 w-1/3 md:w-1/4"
        src={book.thumbnail ?? 'bookNotFound.png'}
        alt={`Cover of the book: ${book.title}`}
      />

      {book.description && (
        <p className="text-sm mb-4 sm:text-base md:text-lg">
          {book.description}
        </p>
      )}

      <Button type="ternary">Add to List</Button>
    </div>
  );
};

export default BookDetails;
