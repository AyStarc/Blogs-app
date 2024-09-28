import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../Context/usercontext';

export default function Postpage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams(); // Destructuring post id from URL parameters.
  const { userInfo } = useContext(UserContext); // To check if current user is the author for editing rights.

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((postInfo) => {
        setPostInfo(postInfo);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [id]); // Added `id` to the dependency array

  if (!postInfo) return ''; // Render nothing if postInfo is not yet available

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="image mb-4">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
          className="w-full h-[50vh] object-cover rounded-lg" // Fixed height of 50% of viewport height
        />
      </div>

      {userInfo.username === postInfo.author && (
        <Link
          to={`/edit/${id}`}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-700 transition"
        >
          Edit
        </Link>
      )}

      <h1 className="text-3xl font-bold mb-2">
        {postInfo.title} by {postInfo.author}
      </h1>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      ></div>
    </div>
  );
}
