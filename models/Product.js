// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  sku: { // Stock Keeping Unit
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  // --- Pricing Details (Admin View) ---
  wholesalePrice: { // Cost to the business
    type: Number,
    required: true
  },
  sellingPrice: { // Price to the customer
    type: Number,
    required: true
  },
  // --- Inventory ---
  stockQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  reorderPoint: { // Quantity that triggers a low-stock alert
    type: Number,
    default: 10
  },
  imageUrl: {
    type: String,
    default: '' // URL from Cloudinary/S3
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for calculated profit margin (Gross Profit)
ProductSchema.virtual('profitMargin').get(function() {
  return this.sellingPrice - this.wholesalePrice;
});

module.exports = mongoose.model('Product', ProductSchema);