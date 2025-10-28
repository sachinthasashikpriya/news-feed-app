import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2'; // or replace with gnews.io endpoint if you prefer

export function useNews({ query = 'latest', category = '', pageSize = 10 }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(null);

  const fetchArticles = useCallback(async (reset = false, q = query, c = category, p = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        apiKey: API_KEY,
        pageSize,
        page: p,
      };

      // If using NewsAPI: use 'everything' for search and 'top-headlines' for category
      let url;
      if (q && q !== '') {
        url = `${BASE_URL}/everything`;
        params.q = q;
      } else {
        url = `${BASE_URL}/top-headlines`;
        if (c) params.category = c;
        params.country = 'us'; // optional
      }

      const resp = await axios.get(url, { params });
      const newArticles = resp.data.articles || [];

      setTotalResults(resp.data.totalResults ?? null);
      setArticles(prev => (reset ? newArticles : [...prev, ...newArticles]));
      setPage(p);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  const loadMore = () => {
    fetchArticles(false, query, category, page + 1);
  };

  useEffect(() => {
    fetchArticles(true, query, category, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, pageSize]);

  return { articles, loading, error, fetchArticles, loadMore, page, totalResults };
}
