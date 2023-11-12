import { ReactNode, useEffect, useState } from 'react';
import { parseBook } from '../../../../utils/helpers';
import { IBook } from '../../../../utils/types';
import { searchForBooksFromGoogle } from '../../../../services/googleBooks/apiGoogleBooks';
import Loader from '../../../../common/Loader/Loader';

interface ISearch {
  value: string;
  handleSetSearchResults: (books: IBook[]) => void;
  children: ReactNode;
}

const Search = ({ value, handleSetSearchResults, children }: ISearch) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      try {
        setIsLoading(true);

        const response = await searchForBooksFromGoogle(value, controller);

        if (response.status != 200) throw new Error('Book not found');

        // - response type: https://developers.google.com/books/docs/v1/reference/volumes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const booksFromApi: IBook[] = response.data.items.map((book: any) =>
          parseBook(book),
        );
        console.log(response.data.items);
        handleSetSearchResults(booksFromApi);
      } catch (e) {
        console.log(`Error fetching books: ${(e as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (value.length > 3) fetchBooks();

    /* 
    cleanup function
      - each time the user types, the query changes and our useEffect hook is called
      - sending a new request is sent to api we end up sending multiple requests in a short span
      - this is wasteful and can cause race conditions
      - so in the cleanup function, we abort the current fetch request before sending a new one every keystroke
    */
    return () => controller.abort();
  }, [value, handleSetSearchResults]);

  return <>{isLoading ? <Loader /> : children}</>;
};

export default Search;

// Not sure if i want to implement this:
//   const loadMore = async () => {
//     const resources = await axios.get(
//       `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=8&startIndex=${details.length}`,
//     );
//     setDetails((oldDetails) => [
//       ...oldDetails,
//       ...resources.data.items,
//     ]);
//   };
