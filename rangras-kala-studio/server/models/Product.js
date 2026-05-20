const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['resin-art', 'warli', 'name-plates', 'coasters', 'home-decor', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number
  },
  images: [{
    type: String, // Cloudinary URLs
    required: true
  }],
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  isCustomOrder: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
