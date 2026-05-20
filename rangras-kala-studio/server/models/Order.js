const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, default: 'pending' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
