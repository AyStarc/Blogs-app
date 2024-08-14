import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userinfo => {
                setUsername(userinfo.username);
            })
        })
    }, [])

    function Logout() {
        fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setUsername(null);

    }
    return (
        <header>
            <Link to="/" className='logo'> MyBlog</Link>
            <nav>
                {
                    username && (
                        <>
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
