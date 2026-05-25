const express = require('express');
const router = express.Router();
const { getUserCart, syncUserCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUserCart).post(protect, syncUserCart);

module.exports = router;
