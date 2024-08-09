import { useState } from 'react'
import React from 'react'
import { Navigate } from 'react-router-dom';

export default function Loginpage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function login(e) {
    e.preventDefault();
    const response = await fetch(
      'http://localhost:4000/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })

    if (response.ok) {
      setRedirect(true);
    }
    else {
      alert('User does not exist or wrong credentials');
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text" placeholder='Enter Username' onChange={(e) => { setUsername(e.target.value) }} />
      <input type="password" placeholder='Enter Password' onChange={(e) => { setPassword(e.target.value) }} />
      <button>Login</button>
    </form>
  )
}
