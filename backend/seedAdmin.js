require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

(async () => {
  try {
    await connectDB();
    const email = 'admin@pos.com';
    const name = 'Admin';
    const password = 'admin123'; // change after first login

    let existing = await Admin.findOne({ email });
    if (existing) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, passwordHash });
    await admin.save();
    console.log('Seeded admin ->', email, 'password:', password);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
