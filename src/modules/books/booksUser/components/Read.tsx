import { useEffect, useState } from 'react';

interface IRead {
  bookIds: string;
}
const Read = ({ bookIds }: IRead) => {
  const [books, setBooks] = useState<IRead>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await Promise.all(
        bookIds.map((id: string) => fetchBookFromGoogleBooksApi(id)),
      );
      setBooks(fetchedBooks);
    };

    fetchBooks();
  }, [bookIds]);

  return (
    <div>
      <h2>To Read</h2>
      {books.map((book) => (
        <div key={book.id}>
          <p>Title: {book.title}</p>
          {/* Additional book details */}
        </div>
      ))}
    </div>
  );
};

export default Read;
