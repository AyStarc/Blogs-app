import React, { useContext, useEffect, useState } from 'react'
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
            })
        })
    }, []);


    function Logout() {
        fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include' // cookies with session/auth information
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;
    return (
        <header>
            <Link to="/" className='logo'> MyBlog</Link>
            <nav>
                {                    
                    username && (
                        <>
                            <h1>Hello ! {username}</h1>
                            <Link to={"/create"}>Create New Post</Link>
                            <button onClick={Logout}>Logout</button>
                        </>
                    )
                }

                {
                    !username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )
                }

            </nav>
        </header>
    );
}
