import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/usercontext';

export default function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userinfo => {
                setUserInfo(userinfo);
            });
        });
    }, [setUserInfo]);

    function Logout() {
        fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include' // cookies with session/auth information
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
                DailyScribbles
            </Link>
            <nav className="space-x-4">
                {                    
                    username ? (
                        <>
                            <span className="text-red-400">Hello, {username}!</span>
                            <Link to="/create" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                Create New Post
                            </Link>
                            <button 
                                onClick={Logout} 
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
                            <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
                        </>
                    )
                }
            </nav>
        </header>
    );
}
