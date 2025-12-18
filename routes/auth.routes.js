// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { adminOnly } = require('../middleware/auth');

// @route POST /api/auth/register - Only admin should register users
router.post('/register', authController.registerUser);

// @route POST /api/auth/login - Allows any user to log in
router.post('/login', authController.login);

module.exports = router;