const Product = require('../models/Product');
const fs = require('fs');
const ImageKit = require('imagekit');

// Initialize ImageKit (Make sure these exist in your .env file)
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "your_public_key",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "your_private_key",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "your_url_endpoint"
});

// Helper function to upload file to ImageKit
const uploadToImageKit = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file.path, { encoding: 'base64' }, (err, data) => {
      if (err) {
        console.error("Local file read error:", err);
        return reject(err);
      }
      
      imagekit.upload({
        file: data, 
        fileName: file.filename
      }, (error, result) => {
        if (error) {
          console.error("ImageKit Upload Error Details:", error);
          return reject(error);
        }
        
        // Successfully uploaded to ImageKit
        resolve(result.url);
      });
    });
  });
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };

    // Parse boolean fields that might come as strings from FormData
    if (productData.isCustomOrder === 'true') productData.isCustomOrder = true;
    if (productData.isCustomOrder === 'false') productData.isCustomOrder = false;
    if (productData.isActive === 'true') productData.isActive = true;
    if (productData.isActive === 'false') productData.isActive = false;

    // Handle uploaded images using ImageKit
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToImageKit(file));
      productData.images = await Promise.all(uploadPromises);
    }

    const product = new Product(productData);

    // if images are not provided, provide a default
    if (!product.images || product.images.length === 0) {
      product.images = ['https://images.unsplash.com/photo-1615529182904-14819c35db37?w=500&auto=format&fit=crop&q=60'];
    }
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    
    // Parse boolean fields
    if (productData.isCustomOrder === 'true') productData.isCustomOrder = true;
    if (productData.isCustomOrder === 'false') productData.isCustomOrder = false;
    if (productData.isActive === 'true') productData.isActive = true;
    if (productData.isActive === 'false') productData.isActive = false;

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToImageKit(file));
      productData.images = await Promise.all(uploadPromises);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
