import React from 'react';

const categories = ['business','entertainment','general','health','science','sports','technology'];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat === value ? '' : cat)}
          className={`px-3 py-1 rounded-full border ${value === cat ? 'bg-blue-600 text-white' : ''}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
