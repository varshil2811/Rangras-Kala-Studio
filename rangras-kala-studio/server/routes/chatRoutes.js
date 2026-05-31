const express = require('express');
const router = express.Router();
const { handleChat, triggerIndex, getFaqs, updateFaqs } = require('../controllers/chatController');

// We are assuming some auth middleware might be needed for admin routes
// const { protect, admin } = require('../middleware/authMiddleware');

router.post('/api/chat', handleChat);
router.post('/api/upload-data', triggerIndex); // optionally add protect, admin
router.get('/api/faq', getFaqs);
router.post('/api/faq', updateFaqs); // optionally add protect, admin

module.exports = router;
