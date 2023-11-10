import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';

interface ISearchBar {
  value: string;
  onChange: (e: SyntheticEvent) => void;
}

const SearchBar = ({ value, ...props }: ISearchBar) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${value}`,
          { signal: controller.signal },
        );

        // If response is not ok
        if (response.status != 200) throw new Error('Book not found');

        const result = response.data.items;
        console.log(result);
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
  }, [value]);

  return (
    <div className="mb-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <input
        type="search"
        className="w-full bg-secondary relative m-5 min-w-0 flex-auto rounded border border-solid border-ternary bg-transparent px-3 py-[0.25rem] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:outline-ternary"
        id="exampleSearch"
        placeholder="Type query"
        value={value}
        {...props}
      />
    </div>
  );
};

export default SearchBar;
