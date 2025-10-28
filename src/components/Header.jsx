import React from 'react';

export default function Header({ children, theme, toggleTheme }) {
  return (
    <header className="py-4 px-6 flex items-center justify-between border-b dark:border-gray-700">
      <h1 className="text-2xl font-semibold">News Feed</h1>
      <div className="flex items-center gap-4">
        {children}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-md border dark:border-gray-600"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  );
}
