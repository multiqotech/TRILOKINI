const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  showInHomePage: {
    type: Boolean,
    default: false,
  },
  homePageOrder: {
    type: Number,
    default: 0,
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
