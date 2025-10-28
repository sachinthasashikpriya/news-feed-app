import React from "react";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat === value ? "" : cat)}
          className={`px-3 py-1 rounded-full border dark:border-gray-600 transition-colors ${
            value === cat
              ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
