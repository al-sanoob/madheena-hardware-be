// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Essential for Angular FE to talk to BE

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware

app.use(express.json()); // Allows parsing of JSON request bodies
app.use(cors());

// --- Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!' + MONGO_URI))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  });

// --- Import Routes ---
const authRoutes = require('./routes/auth.routes');
const inventoryRoutes = require('./routes/inventory.routes');

app.use((req, res, next) => {
    console.log(`📢 Incoming Request: ${req.method} ${req.url}`);
    next();
});

// --- Define Routes ---
app.use('/api/auth', authRoutes);
app.use('/api', inventoryRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('Hardware Store API is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// NOTE: Create a .env file in your root folder:
// MONGO_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"
// JWT_SECRET="YOUR_VERY_STRONG_SECRET_KEY"