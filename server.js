require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { SpeechClient } = require('@google-cloud/speech');
const authRoutes = require('./routes/authRoutes');
const audioRoutes = require('./routes/audioRoutes');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Rate limiter to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later',
});
app.use(limiter);

// Routes
app.use('/auth', authRoutes);
app.use('/audio', audioRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
