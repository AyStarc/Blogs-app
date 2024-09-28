import React, { useEffect, useState } from 'react';
import Post from '../Components/post';

export default function Homepage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/posts')
            .then((response) => response.json())
            .then((posts) => {
                setPosts(posts);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Explore Musings!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length > 0 && posts.map(post => (
                    <Post key={post._id} {...post} />
                ))}
            </div>
        </div>
    );
}
