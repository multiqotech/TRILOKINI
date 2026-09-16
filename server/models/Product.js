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

const addonSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  hasSizes: { type: Boolean, default: false },
  sizes: [{ type: String }],
}, { _id: true });

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
  currentPrice: { type: Number },
  previousPrice: { type: Number },
  discountPercentage: { type: Number },
  imageUrl: { type: String },
  designerName: { type: String },
  productCode: { type: String, trim: true },
  description: { type: String },
  shippingInfo: { type: String },
  disclaimer: { type: String },
  supplierInfo: { type: String },
  sizes: [{ type: String }],
  bottomSizes: [{ type: String }],
  stockBySize: {
    type: Map,
    of: Number,
    default: {},
  },
  addons: [addonSchema],
  customTailoringEnabled: { type: Boolean, default: true },
  customTailoringPrice: { type: Number, default: 0 },
  tags: [{ type: String, trim: true }],
  showInHomePage: { type: Boolean, default: false },
  homePageOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.pre('save', function() {
  if (this.previousPrice && this.currentPrice && this.previousPrice > this.currentPrice && (this.discountPercentage == null || this.discountPercentage === '')) {
    this.discountPercentage = Math.round(((this.previousPrice - this.currentPrice) / this.previousPrice) * 100);
  }

  if (this.variants && this.variants.length > 0) {
    this.variants.forEach(variant => {
      if (variant.previousPrice && variant.currentPrice && variant.previousPrice > variant.currentPrice && (variant.discountPercentage == null || variant.discountPercentage === '')) {
        variant.discountPercentage = Math.round(((variant.previousPrice - variant.currentPrice) / variant.previousPrice) * 100);
      }
    });

    const primaryVariant = this.variants[0];
    if (this.currentPrice != null) primaryVariant.currentPrice = this.currentPrice;
    else this.currentPrice = primaryVariant.currentPrice;

    if (this.previousPrice != null) primaryVariant.previousPrice = this.previousPrice;
    else this.previousPrice = primaryVariant.previousPrice;

    if (this.discountPercentage != null) primaryVariant.discountPercentage = this.discountPercentage;
    else this.discountPercentage = primaryVariant.discountPercentage;

    if (this.imageUrl) {
      const images = Array.isArray(primaryVariant.images) ? primaryVariant.images.filter(Boolean) : [];
      primaryVariant.images = [this.imageUrl, ...images.filter((url) => url !== this.imageUrl)];
    } else if (primaryVariant.images && primaryVariant.images.length > 0) {
      this.imageUrl = primaryVariant.images[0];
    }
  }
});

module.exports = mongoose.model('Product', productSchema);
