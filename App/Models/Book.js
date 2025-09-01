const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  inStock: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema, 'Book');
