// controllers/auth.controller.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to generate JWT
const signToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: '1d' // Token expires in 1 day
  });
};

// @route   POST /api/auth/register (Admin use only to set up accounts)
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user instance
    user = new User({ username, password, role });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Respond with a token
    res.status(201).json({ 
        token: signToken(user._id, user.role),
        username: user.username,
        role: user.role
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
    console.log("=== LOGIN ATTEMPT START ===");
    console.log("Body received:", req.body); 

    const { username, password } = req.body;
    
    try {
        // 1. Find User
        const user = await User.findOne({ username });
        console.log("User found in DB:", user ? "YES" : "NO");

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // 2. Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Is password matching?:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // 3. Generate Token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'madheena_secret_key_2025', 
            { expiresIn: '1d' }
        );

        console.log("✅ Login Successful for:", username);
        
        res.json({ 
            token, 
            role: user.role, 
            username: user.username 
        });

    } catch (err) {
        console.error("❌ Server Error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};