const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// POST /auth/register
// One-time registration (you can seed using seedAdmin.js instead)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    let existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, passwordHash });
    await admin.save();
    res.json({ message: 'Admin registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { id: admin._id, email: admin.email, name: admin.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' });
    res.json({ token, admin: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
