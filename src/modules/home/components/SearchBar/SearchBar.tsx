/*
  - Search bar on home page
  - controlled element, 
  - onchange it mutates the searchValue variable stored in Home.tsx, which triggers an api call to googlebooksapi
  */

import { SyntheticEvent } from 'react';

interface ISearchBar {
  value: string;
  onChange: (e: SyntheticEvent) => void;
}

const SearchBar = ({ value, ...props }: ISearchBar) => {
  return (
    <div className="mb-3 flex  w-[90%] sm:w-[60%]">
      <input
        type="search"
        className="bg-transparent relative m-5 w-full min-w-0 flex-auto rounded border border-solid border-ternary bg-secondary px-3 py-[0.25rem] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:outline-ternary"
        id="exampleSearch"
        placeholder="Type query"
        value={value}
        {...props}
      />
    </div>
  );
};

export default SearchBar;
