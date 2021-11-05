import mongoose from 'mongoose';

const namuSchema = new mongoose.Schema({
  title: {
    type: String
  },
  text: {
    type: String
  }
}, { collection: 'namu' });

export default mongoose.model('namu', namuSchema);
