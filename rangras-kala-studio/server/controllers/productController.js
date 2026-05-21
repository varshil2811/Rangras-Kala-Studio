const Product = require('../models/Product');

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

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      // Create URLs for the uploaded files
      // Use standard URL format for static files
      productData.images = req.files.map(file => {
        // Construct the URL path (assuming server runs on standard API URL)
        // Since we'll fetch them from the frontend, we just store the relative path or full backend URL
        // A relative path is usually better, but for simplicity here we can store the full path
        const baseUrl = req.protocol + '://' + req.get('host');
        return `${baseUrl}/uploads/${file.filename}`;
      });
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
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
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
