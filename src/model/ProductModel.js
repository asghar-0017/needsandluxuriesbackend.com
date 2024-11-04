const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: false },
  price: { type: Number, required: false },
  review: { type: String, required: false },
  description: { type: String, required: false },
  imageUrl: { type: String, required: false },
  quantity: { type: Number, required: false },
  discountPrice: { type: Number, required: false },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    required: false,
  },
  stockStatus: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
    default: 'In Stock',
    required: false,
  },
  sale: { type: Boolean, required: false },
  collection: { type: String, required: false },
  subCollection: { type: String, required: false },
  isStitching: { type: Boolean, required: false },
  stitchedPrice: { type: Number, required: false },
  stitchImage: { type: mongoose.Schema.Types.ObjectId, ref: "StitchImage", required: false },
  newPrice: { type: Number, required: false },
  category: { type: String, enum: ['Clothes', 'Watches', 'Jackets'], required: true },
  subCategory: { type: String, required: false },
  weight: { type: Number, required: false },
  materials: { type: [String], required: false },
  otherInfo: { type: String, required: false },
});

ProductSchema.statics.validCategories = ['Clothes', 'Watches', 'Jackets'];

module.exports = mongoose.model("Product", ProductSchema);
