import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-4 gap-2">
      <input
        type="text"
        placeholder="Search country by name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-80 px-4 py-2 border rounded shadow"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
