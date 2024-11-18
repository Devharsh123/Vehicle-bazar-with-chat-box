import { useState } from "react";

const Search = ({ list, onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    const filteredText = searchText
      ? list.filter((res) =>
          res.model.toLowerCase().includes(searchText.toLowerCase())
        )
      : "";

    onSearch(filteredText);
  };
  return (
    <div className="mr-5">
      <input
        className="mr-2 w-80 h-10 p-4 border-black border-2 rounded"
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <button
        class="items-center rounded-md border text-white bg-indigo-700 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm mx-2 px-6 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
