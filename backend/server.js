require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect MongoDB
connectDB()
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error(' MongoDB connection failed:', err));

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/sales', require('./routes/sales'));

// Test route
app.get('/', (req, res) => res.send('Mini POS API running '));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
