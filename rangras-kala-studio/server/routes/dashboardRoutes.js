const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const Message = require('../models/Message');

router.get('/', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;

    const newMessages = await Message.countDocuments({ isRead: false });

    // Latest orders for dashboard
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      productCount,
      totalRevenue,
      pendingOrders,
      newMessages,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
