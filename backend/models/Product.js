const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stockQty: { type: Number, required: true, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true } // 👈 new field
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
