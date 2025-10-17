const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded.id).select('-passwordHash'); // 👈 attach user info
    if (!req.user) return res.status(401).json({ message: 'Invalid user' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
