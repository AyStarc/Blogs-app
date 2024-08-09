import React, { useState } from 'react'
import { json } from 'react-router-dom';

export default function Registerpage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(e) {
        e.preventDefault(); //When a form is submitted, the default behavior is for
        // the browser to send the form data to the server and reload the page.
        // Using e.preventDefault() prevents this default action

        const response = await fetch(
            'http://localhost:4000/register',
            {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' }
            }
        )

        console.log(response);

        if (response.ok) {
            alert("Succefully Registered");
        }
        else {
            alert("Username Unavailable");
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" placeholder='Enter Username' onChange={(e) => { setUsername(e.target.value) }} />
            <input type="password" placeholder='Enter Password' onChange={(e) => { setPassword(e.target.value) }} />
            <button>Register</button>
        </form>
    );
}





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
//     // Connect the client to the server	(optional starting in v4.7)
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
