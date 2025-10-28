import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="flex-1 px-3 py-2 rounded-l-md border focus:outline-none"
        placeholder="Search news..."
        aria-label="Search news"
      />
      <button className="px-4 rounded-r-md border" type="submit">Search</button>
    </form>
  );
}
