const asyncHandler = require('express-async-handler');
const { generateResponse, indexData } = require('../services/ragService');
const fs = require('fs');
const path = require('path');

// @desc    Handle chat messages
// @route   POST /api/chat
// @access  Public
const handleChat = asyncHandler(async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        res.status(400);
        throw new Error('Message is required');
    }
    
    try {
        const reply = await generateResponse(message);
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ message: 'Error generating response', error: error.message });
    }
});

// @desc    Trigger vector database re-index
// @route   POST /api/upload-data
// @access  Private/Admin
const triggerIndex = asyncHandler(async (req, res) => {
    try {
        await indexData();
        res.status(200).json({ message: 'Data indexed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error indexing data', error: error.message });
    }
});

// @desc    Get all FAQs
// @route   GET /api/faq
// @access  Public
const getFaqs = asyncHandler(async (req, res) => {
    const dataPath = path.join(__dirname, "../data/website_data.json");
    try {
        const rawData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        res.status(200).json(rawData.faqs || []);
    } catch (error) {
        res.status(500).json({ message: 'Error reading FAQs' });
    }
});

// @desc    Update FAQs
// @route   POST /api/faq
// @access  Private/Admin
const updateFaqs = asyncHandler(async (req, res) => {
    const { faqs } = req.body;
    
    if (!faqs || !Array.isArray(faqs)) {
        res.status(400);
        throw new Error('Invalid FAQ data format');
    }
    
    const dataPath = path.join(__dirname, "../data/website_data.json");
    try {
        const rawData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        rawData.faqs = faqs;
        fs.writeFileSync(dataPath, JSON.stringify(rawData, null, 2));
        
        // Auto re-index after update
        await indexData();
        
        res.status(200).json({ message: 'FAQs updated and re-indexed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating FAQs' });
    }
});

module.exports = {
    handleChat,
    triggerIndex,
    getFaqs,
    updateFaqs
};
