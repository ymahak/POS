const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');

// protect all routes
router.use(auth);

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user._id }).sort({ createdAt: -1 }); // 👈 filter
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /products
router.post('/', async (req, res) => {
  try {
    const { name, price, stockQty } = req.body;
    const p = new Product({ name, price, stockQty, createdBy: req.user._id }); // 👈 store user id
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// PUT /products/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, price, stockQty } = req.body;
    const p = await Product.findByIdAndUpdate(req.params.id, { name, price, stockQty }, { new: true });
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /products/:id
router.delete('/:id', async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
