import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ArticleCard from './components/ArticleCard';
import { useNews } from './hooks/useNews';

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const { articles, loading, error, loadMore, totalResults } = useNews({ query, category, pageSize: 9 });

  return (
    <div className="min-h-screen">
      <Header theme={theme} toggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}>
        <SearchBar onSearch={(q) => setQuery(q)} />
      </Header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="mb-4">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        {loading && articles.length === 0 && (
          <div className="text-center py-20">Loading...</div>
        )}

        {error && <div className="text-center text-red-500 py-4">Something went wrong: {error}</div>}

        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-20">No articles found.</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => <ArticleCard key={a.url + i} article={a} />)}
        </div>

        {articles.length > 0 && totalResults && articles.length < totalResults && (
          <div className="mt-6 text-center">
            <button onClick={loadMore} className="px-4 py-2 rounded-md border">
              Load more
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
