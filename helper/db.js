import namu from '../model/index.js';

export async function getNamuDocumentByTitle(title) {
  return await namu.findOne({ title }, 'title text');
}
