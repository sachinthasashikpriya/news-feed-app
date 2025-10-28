import React, { useEffect, useState } from "react";
import ArticleCard from "./components/ArticleCard";
import CategoryFilter from "./components/CategoryFilter";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { useNews } from "./hooks/useNews";

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [theme, setTheme] = useState(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    // Apply theme immediately
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const { articles, loading, error, loadMore, totalResults } = useNews({
    query,
    category,
    pageSize: 9,
  });

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Infinite scroll implementation
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to near the bottom (within 100px)
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        // Only load more if there are more articles available and not currently loading
        if (
          articles.length > 0 &&
          totalResults &&
          articles.length < totalResults &&
          !loading
        ) {
          loadMore();
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articles.length, totalResults, loading, loadMore]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header theme={theme} toggleTheme={handleThemeToggle}>
        <SearchBar onSearch={(q) => setQuery(q)} />
      </Header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="mb-4">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        {loading && articles.length === 0 && (
          <div className="text-center py-20 text-gray-600 dark:text-gray-300">
            Loading...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-4">
            Something went wrong: {error}
          </div>
        )}

        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-20 text-gray-600 dark:text-gray-300">
            No articles found.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <ArticleCard key={a.url + i} article={a} />
          ))}
        </div>

        {/* Loading indicator for infinite scroll */}
        {loading && articles.length > 0 && (
          <div className="text-center py-8 text-gray-600 dark:text-gray-300">
            Loading more articles...
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
