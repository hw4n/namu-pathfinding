import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose.connect(process.env.DBURI).then(() => {
  console.log('database connected');
}).catch(err => {
  console.log(err);
});

import namu from './model/index.js';
namu.find({ title: "JavaScript" }).then(data => {
  console.log(data);
});
