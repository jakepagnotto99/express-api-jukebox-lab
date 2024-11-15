const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const tracks = require('./routes/tracks');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

// Routes
app.use('/api', tracks);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
