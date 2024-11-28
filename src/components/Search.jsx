import React, { useState } from "react";

const Search = ({ onSearch, cities, setSearchQuery }) => {
  // Define local state for the search input
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleSearch = () => {
    let lowerCaseSearch = localSearchQuery.toLowerCase();
    const filteredCities = cities.filter(
      (city) => city.toLowerCase().includes(lowerCaseSearch)
    );

    if (localSearchQuery===""|| filteredCities.length === 0) {
        alert("due to limitation of api cant find cities");
        return;
      }

    setSearchQuery(localSearchQuery);
    onSearch(localSearchQuery);
    setLocalSearchQuery("");
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="eg: london , los angeles"
        value={localSearchQuery}
        onChange={(e) => setLocalSearchQuery(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
