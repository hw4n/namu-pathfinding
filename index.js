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

const visited = new Set();

// not very efficient but it works
async function namuDFS(currentTitle, destTitle, path=[]) {
  if (visited.has(currentTitle)) {
    return;
  }
  path.push(currentTitle);
  visited.add(currentTitle);

  if (currentTitle === destTitle) {
    console.log(path);
    process.exit(0);
  }

  const namuDocument = await getNamuDocumentByTitle(currentTitle);
  if (namuDocument === null) {
    return;
  }
  const { text } = namuDocument;
  const links = getEveryLinkFromText(text);
  for (const link of links) {
    namuDFS(link, destTitle, path);
  }
}

// yeah this works well
async function namuBFS(startTitle, destTitle) {
  const queue = [[startTitle, [startTitle]]];
  while (queue.length) {
    const [currentTitle, path] = queue.shift();
    if (visited.has(currentTitle)) {
      continue;
    }
    visited.add(currentTitle);
    const namuDocument = await getNamuDocumentByTitle(currentTitle);
    if (namuDocument === null) {
      continue;
    }
    const { text } = namuDocument;
    const links = getEveryLinkFromText(text);
    for (const link of links) {
      if (link === destTitle) {
        console.log([...path, link]);
        process.exit(0);
      }
      queue.push([link, [...path, link]]);
    }
  }
}
