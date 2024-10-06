const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  location: {
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true }
  }
});

module.exports = mongoose.model('Post', postSchema);
