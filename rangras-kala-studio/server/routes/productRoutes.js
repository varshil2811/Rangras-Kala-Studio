const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const upload = require('../middleware/upload');

router.route('/')
  .get(getProducts)
  .post(upload.array('images', 5), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
