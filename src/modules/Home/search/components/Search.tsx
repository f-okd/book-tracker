import { ReactNode, useEffect } from 'react';
import { IBook } from '../../../../utils/types';
import { searchForBooksFromGoogle } from '../../../../services/googleBooks/apiGoogleBooks';

interface ISearch {
  value: string;
  handleSetSearchResults: (books: IBook[]) => void;
  toggleIsLoading: (bool: boolean) => void;
  children: ReactNode;
}

const Search = ({
  value,
  handleSetSearchResults,
  toggleIsLoading,
  children,
}: ISearch) => {
  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      try {
        toggleIsLoading(true);

        const booksFromApi = await searchForBooksFromGoogle(value, controller);

        if (booksFromApi) {
          handleSetSearchResults(booksFromApi);
        } else console.log('booksFromApi undefined');
      } catch (e) {
        console.log(`Error fetching books: ${(e as Error).message}`);
      } finally {
        toggleIsLoading(false);
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
  }, [value, handleSetSearchResults, toggleIsLoading]);

  return <>{children}</>;
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
