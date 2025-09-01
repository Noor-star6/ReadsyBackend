const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB local URI
const mongoURI = 'mongodb://127.0.0.1:27017/readsy';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(' Connected to MongoDB (localhost)');
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
});
