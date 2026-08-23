const mongoose = require('mongoose');

const weddingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: 'SHOP NOW',
  },
  href: {
    type: String,
    default: '#',
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isWide: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('WeddingItem', weddingItemSchema);
