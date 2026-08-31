const mongoose = require('mongoose');

const collectionImageSchema = new mongoose.Schema({
  collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  href: {
    type: String,
    default: '#',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

collectionImageSchema.index({ collection: 1, position: 1 }, { unique: true });

module.exports = mongoose.model('CollectionImage', collectionImageSchema);
