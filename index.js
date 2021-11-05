import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

await mongoose.connect(process.env.DBURI).then(() => {
  console.log('database connected');
}).catch(err => {
  console.log(err);
});

import { getNamuDocumentByTitle } from './helper/db.js';
import { getEveryLinkFromText } from './helper/namu.js';

const { text } = await getNamuDocumentByTitle('JavaScript');
console.log(getEveryLinkFromText(text));
