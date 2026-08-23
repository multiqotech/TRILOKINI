const mongoose = require('mongoose');

const favouriteItemSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: '#',
  },
  position: {
    type: String,
    enum: ['left-wide-1', 'left-square-1', 'left-square-2', 'left-wide-2', 'left-square-3', 'left-square-4', 'right-tall', 'right-square-1', 'right-square-2', 'right-wide'],
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('FavouriteItem', favouriteItemSchema);
