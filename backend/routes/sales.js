const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// protect all routes
router.use(auth);

// POST /sales
router.post('/', async (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [req.body];
    const sales = [];

    for (const item of items) {
      const { productId, quantity } = item;
      const product = await Product.findOne({ _id: productId, createdBy: req.user._id }); // 👈 only user’s product

      if (!product) {
        return res.status(400).json({ message: 'Product not found or unauthorized' });
      }

      if (product.stockQty < quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      const totalAmount = product.price * quantity;
      const sale = new Sale({
        productId,
        productName: product.name,
        quantity,
        totalAmount,
        createdBy: req.user._id // 👈 link sale to admin
      });
      await sale.save();

      product.stockQty -= quantity;
      await product.save();

      sales.push(sale);
    }

    res.status(201).json({ message: 'Sale recorded successfully', sales });
  } catch (err) {
    res.status(500).json({ message: 'Server error while recording sale' });
  }
});

// GET /sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find({ createdBy: req.user._id }).sort({ soldAt: -1 }); // 👈 filter
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
