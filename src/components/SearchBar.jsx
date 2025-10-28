import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="flex-1 px-3 py-2 rounded-l-md border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
        placeholder="Search news..."
        aria-label="Search news"
      />
      <button
        className="px-4 rounded-r-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-colors"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
