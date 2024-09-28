import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Components/editor';
import { UserContext } from '../Context/usercontext';

export default function Createpostpage() {
    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const { userInfo } = useContext(UserContext);

    async function createNewPost(e) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files?.[0]);
        data.set('author', userInfo.username);

        e.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        alert("Success");
        return <Navigate to={'/'} />;
    }

    return (
        <form onSubmit={createNewPost} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
            
            <input 
                type="text" 
                placeholder='Title' 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required 
            />

            <input 
                type="text" 
                placeholder='Summary' 
                onChange={(e) => setSummary(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required 
            />

            <input 
                type="file" 
                onChange={(e) => setFiles(e.target.files)} 
                className="mb-4"
            />

            <Editor value={content} onChange={setContent} />

            <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
            >
                Create Post
            </button>
        </form>
    );
}

