const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
    trim: true,
  },
  images: [{
    type: String,
  }],
  currentPrice: {
    type: Number,
    required: true,
  },
  previousPrice: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
  }
});

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
  variants: [variantSchema],
  // Retaining root fields for backward compatibility, making them optional
  currentPrice: {
    type: Number,
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
  tags: [{
    type: String,
    trim: true,
  }],
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

// Pre-save hook to calculate discounts and sync primary variant
productSchema.pre('save', function(next) {
  // Calculate discount for root level
  if (this.previousPrice && this.currentPrice && this.previousPrice > this.currentPrice) {
    this.discountPercentage = Math.round(((this.previousPrice - this.currentPrice) / this.previousPrice) * 100);
  }
  
  // Calculate discounts for variants
  if (this.variants && this.variants.length > 0) {
    this.variants.forEach(variant => {
      if (variant.previousPrice && variant.currentPrice && variant.previousPrice > variant.currentPrice) {
        variant.discountPercentage = Math.round(((variant.previousPrice - variant.currentPrice) / variant.previousPrice) * 100);
      }
    });
    
    // Sync first variant to root fields to prevent breaking the storefront homepage
    const primaryVariant = this.variants[0];
    this.currentPrice = primaryVariant.currentPrice;
    this.previousPrice = primaryVariant.previousPrice;
    this.discountPercentage = primaryVariant.discountPercentage;
    if (primaryVariant.images && primaryVariant.images.length > 0) {
      this.imageUrl = primaryVariant.images[0];
    }
  }
  
  next();
});

module.exports = mongoose.model('Product', productSchema);
