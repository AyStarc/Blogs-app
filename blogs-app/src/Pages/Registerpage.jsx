import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/usercontext';

export default function Registerpage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const currentUser = await response.json(); // Assuming the server responds with user info
      setUserInfo(currentUser);
      alert("Successfully Registered");
      navigate('/login'); // Redirect to login page after successful registration
    } else {
      setErrorMessage("Username Unavailable");
    }
  }

  return (
    <form className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={register}>
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      
      <input
        type="text"
        placeholder='Enter Username'
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      
      <input
        type="password"
        placeholder='Enter Password'
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200">
        Register
      </button>
    </form>
  );
}

// MongoDB connection example code
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ayushsinghh2203:<password>@cluster1.kt7jb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
