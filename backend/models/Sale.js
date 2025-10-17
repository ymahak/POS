const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  soldAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true } // 👈 new field
});

module.exports = mongoose.model('Sale', SaleSchema);
