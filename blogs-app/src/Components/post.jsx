import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, cover, createdAt }) {
  return (
    <Link to={`/post/${_id}`} className="block bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="image">
        <img
          src={`http://localhost:4000/${cover}`}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 mb-2" style={{ lineHeight: '1.4' }}>
          {title}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          <span className="font-medium text-gray-700">Author</span>
          <time className="ml-2 text-gray-500">{new Date(createdAt).toLocaleDateString()}</time>
        </p>
        <p className="mt-2 text-gray-700 overflow-hidden h-16" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
          {summary}
        </p>
      </div>
    </Link>
  );
}
