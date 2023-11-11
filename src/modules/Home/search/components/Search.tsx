import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { parseBook } from '../../../../utils/helpers';
import { IBook } from '../../../../utils/types';

interface ISearch {
  value: string;
  handleSetSearchResults: (books: IBook[]) => void;
  children: ReactNode;
}

const Search = ({ value, handleSetSearchResults, children }: ISearch) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(value);
    const controller = new AbortController();
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=8`,
          { signal: controller.signal },
        );

        // Pagination:
        //   const loadMore = async () => {
        //     const resources = await axios.get(
        //       `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=8&startIndex=${details.length}`,
        //     );
        //     setDetails((oldDetails) => [
        //       ...oldDetails,
        //       ...resources.data.items,
        //     ]);
        //   };

        // If response is not ok
        if (response.status != 200) throw new Error('Book not found');

        /* 
          - i know damn well what type the book is but im not typing all that out #sorrynotsorry
          - response type: https://developers.google.com/books/docs/v1/reference/volumes 
        */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const booksFromApi: IBook[] = response.data.items.map((book: any) =>
          parseBook(book),
        );
        handleSetSearchResults(booksFromApi);
      } catch (e) {
        console.log(`Error fetching books: ${(e as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    // wait for user to type at least 3 characters
    if (value.length > 3) fetchBook();

    /* cleanup function
          - each time the user types, the query changes and our useEffect hook is called
          - sending a new request is sent to api we end up sending multiple requests in a short span
          - this is wasteful and can cause race conditions
          - so in the cleanup function, we abort the current fetch request before sending a new one every keystroke
      */
    return () => controller.abort();
  }, [value, handleSetSearchResults]);

  return <>{children}</>;
};

export default Search;
