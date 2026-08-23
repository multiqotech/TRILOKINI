const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  previousPrice: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  designerName: {
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
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

// Pre-save hook to calculate discount if both prices exist
productSchema.pre('save', function() {
  if (this.previousPrice && this.currentPrice && this.previousPrice > this.currentPrice) {
    this.discountPercentage = Math.round(((this.previousPrice - this.currentPrice) / this.previousPrice) * 100);
  }
});

module.exports = mongoose.model('Product', productSchema);
