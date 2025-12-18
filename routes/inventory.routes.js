// routes/inventory.routes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');
const { protect, adminOnly } = require('../middleware/auth');

// @route GET /api/inventory - All authenticated users can view the list
// router.get('/', protect, inventoryController.getProducts);
router.get('/', inventoryController.getProducts);

// --- Admin Only Routes ---
// protect middleware runs first, then adminOnly checks the role
// router.post('/products', protect, adminOnly, inventoryController.addProduct);
router.post('/products', adminOnly, inventoryController.addProduct);

router.put('/:id', protect, adminOnly, inventoryController.updateProduct);
router.delete('/:id', protect, adminOnly, inventoryController.deleteProduct);

module.exports = router;