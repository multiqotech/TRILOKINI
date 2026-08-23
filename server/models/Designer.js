const mongoose = require('mongoose');

const designerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
  },
  subtitle: {
    type: String,
    default: 'SHOP NOW',
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

module.exports = mongoose.model('Designer', designerSchema);
