const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.xbvrhfr.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => console.log('🚀 Server running on PORT 5000'));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);