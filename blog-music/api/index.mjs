import express, { json } from 'express';
import cors from 'cors';
import { connect } from "mongoose";
import { User } from '../models/User.mjs';
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');

const salt = 'bcrypt.genSaltSync(10)';
const secret = 'sa653256dsahdas8aqewrtrty';

app.use(cors({credentials:true,origin:'http://localhost:5173/login'}));
app.use(express.json());

connect('mongodb+srv://01laurenjohnson:mpTEPqTMA1OqWLip@cluster0.wqyzutj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.get('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok                        ');
        })
        // res.json();
    } else {
        res.status(400).json('wrong credentials');
    }
});

app.listen(4000);

