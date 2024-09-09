import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from '../Models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieparser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import Post from "../Models/post.js";
import { fileURLToPath } from 'url';
import path from 'path';


const uploadMiddleware = multer({ dest: 'uploads/' });
const salt = bcrypt.genSaltSync(10);
const secret = "jhvjgvjv"; // for jwt
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieparser());
app.use(express.static('./uploads'));


mongoose.connect('mongodb+srv://ayushsinghh2203:987654321@cluster1.kt7jb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')

// Route handler for POST /register
app.post('/register', async (req, res) => {
    const { username, password } = req.body; // destructure username, password from body

    try {
        const newuser = await User.create({ username, password: bcrypt.hashSync(password, salt) });
        res.json(newuser);
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e); // status code for client side handling
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body; // destructure username, password from body

    const currentUser = await User.findOne({ username }); // find user in db

    // Handle the case when user doesn't exist

    const passok = bcrypt.compareSync(password, currentUser.password); // compare the pw

    // can't the payload only be username?
    if (passok) {
        // create a jwt token
        jwt.sign({ username: username, id: currentUser._id }, secret, {}, (err, token) => {
            if (err) throw err;

            res.cookie('token', token).json({
                username, id: currentUser._id
            });

            // we are passing jwt tokens in cookies for authentication but we can pass them
            // as response headers or response body as well

            // this token is stored on the client side and sent in subsequent requests to maintain session

            // from client side 
            // Include the JWT in the Authorization header of subsequent requests to authenticate the user.

            // cookie response is sent name = 'token' and value = token
            // the browser will store the cookie and include it in subsequent requests to the server
            // alongside json response is sent
        });
    }

    // wrong password
    else {
        res.status(400).json('wrong creds');
    }

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
        console.log(info);
    });

})

app.post('/logout', (req, res) => {

    // the recieved cookie/token cleared, user session terminated
    // same cookie named 'token' is cleared
    // matched only based on cookie name? there has to be another way
    res.cookie('token', '').json('ok');

})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    console.log("        "+path);
    console.log(originalname);
    const extension = originalname.split('.')[1];

    const newPath = path + '.' + extension;
    const pathforDB = path.split('\\')[1] + '.' + extension;

    console.log(newPath);
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;

    const postDoc = await Post.create({
        title, summary, content, cover: pathforDB
    })
    res.json({ files: req.file });
});

app.get('/post', async (req, res) => {
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(posts);
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id);

    res.json(postDoc);
})

app.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
});
