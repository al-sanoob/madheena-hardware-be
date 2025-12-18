// controllers/inventory.controller.js
const Product = require('../models/Product');

// @route   POST /api/inventory (Admin Only)
// @desc    Add a new product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error while adding product');
  }
};

// @route   GET /api/inventory (All authenticated users)
// @desc    Get all inventory items (Dashboard List)
exports.getProducts = async (req, res) => {
  try {
    // Use select('-wholesalePrice') for POS users if you want to hide cost price,
    // but for admin dashboard, we include it. The frontend handles this separation.
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error while fetching inventory');
  }
};

// @route   PUT /api/inventory/:id (Admin Only)
// @desc    Update a product's details
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error while updating product');
  }
};

// @route   DELETE /api/inventory/:id (Admin Only)
// @desc    Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error while deleting product');
  }
};