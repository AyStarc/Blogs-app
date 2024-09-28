import { useContext, useState } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/usercontext';

export default function Loginpage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      const currentUser = await response.json();
      setUserInfo(currentUser);
      setRedirect(true);
    } else {
      alert('User does not exist or wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={login}>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder='Enter Username'
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <input
        type="password"
        placeholder='Enter Password'
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200">
        Login
      </button>
    </form>
  );
}
