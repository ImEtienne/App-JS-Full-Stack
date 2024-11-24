const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  _id: { type: Number, required: true }, 
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  warranty_years: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', ProductSchema);
