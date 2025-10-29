import React from "react";

export default function Header({ children, theme, toggleTheme }) {
  return (
    <header className="py-4 px-6 flex items-center justify-between border-b dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        News Feed
      </h1>
      <div className="flex items-center gap-4">
        {children}
        <button
          onClick={toggleTheme}
          className="w-20 px-3 py-1 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-colors text-sm font-medium"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}
