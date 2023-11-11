import { SyntheticEvent } from 'react';

interface ISearchBar {
  value: string;
  onChange: (e: SyntheticEvent) => void;
}

const SearchBar = ({ value, ...props }: ISearchBar) => {
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
