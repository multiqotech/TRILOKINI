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
  }
}, { timestamps: true });

// Pre-save hook to calculate discount if both prices exist
productSchema.pre('save', function(next) {
  if (this.previousPrice && this.currentPrice && this.previousPrice > this.currentPrice) {
    this.discountPercentage = Math.round(((this.previousPrice - this.currentPrice) / this.previousPrice) * 100);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
