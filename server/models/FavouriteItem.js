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
    enum: ['left_large_1', 'left_small_1', 'left_small_2', 'left_large_2', 'left_small_3', 'left_small_4', 'right_tall', 'right_small_1', 'right_small_2', 'right_large_1', 'mobile'],
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
