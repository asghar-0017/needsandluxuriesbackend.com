const mongoose = require('mongoose');

const stitchImageSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a Product model
    required: true,
  },
  stitchImage: { type: String }, // Change from ObjectId to String

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StitchImage = mongoose.model('StitchImage', stitchImageSchema);

module.exports = StitchImage;
