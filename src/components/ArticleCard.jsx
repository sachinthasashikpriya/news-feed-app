import React from "react";

export default function ArticleCard({ article }) {
  const { title, urlToImage, description, url, source, publishedAt } = article;
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border dark:border-gray-700 flex flex-col h-full">
      <a href={url} target="_blank" rel="noreferrer" className="block">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-sm">No image</span>
          </div>
        )}
      </a>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-semibold text-lg mb-1">{title}</h2>
        <p className="text-sm line-clamp-3 mb-2 flex-grow">{description}</p>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center mt-auto">
          <span>{source?.name ?? "Unknown"}</span>
          <span>{new Date(publishedAt).toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}
