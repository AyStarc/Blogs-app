import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from '../Models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieparser from 'cookie-parser';


const salt = bcrypt.genSaltSync(10);
const secret = "jhvjgvjv"; // for jwt
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());

mongoose.connect('mongodb+srv://ayushsinghh2203:987654321@cluster1.kt7jb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')

// Route handler for POST /register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newuser = await User.create({ username, password: bcrypt.hashSync(password, salt) });
        res.json(newuser);
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await User.findOne({ username });

    const passok = bcrypt.compareSync(password, currentUser.password);

    // can't the payload only be username?
    jwt.sign({ username: username, id: currentUser._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json('ok');
    });

})

app.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
});
