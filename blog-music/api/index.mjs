import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import User from './models/User.mjs';
import Post from './models/Post.mjs';
// import Post from './models/Post.mjs';
// import { genSaltSync } from 'bcryptjs';
import bcrypt from 'bcryptjs';
// const express = require('express');
const app = express();

import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' });
import { renameSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
const router = express.Router();

const salt = bcrypt.genSalt(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use('/uploads', (__dirname + '/uploads'));

mongoose.connect('mongodb+srv://01laurenjohnson:b5QPjetOvQrScSuw@cluster0.wqyzutj.mongodb.net/');

app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const userDoc = await create({
      username,
      password:hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await findOne({username});
  const passOk = compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  renameSync(path, newPath);

  const {token} = req.cookies;
  verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content} = req.body;
    const postDoc = await _create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id,
    });
    res.json(postDoc);
  });

});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    renameSync(path, newPath);
  }

  const {token} = req.cookies;
  verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});

app.get('/post', async (req,res) => {
  res.json(
    await find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await findById(id).populate('author', ['username']);
  res.json(postDoc);
})

app.listen(5000);
//


