const mongoose = require("mongoose");
const ProductModel = require("./ProductModel");

const WatchSchema = new mongoose.Schema({
  weight: { type: Number },
  waterproof: { type: Boolean, default: false },
  warrantyYears: { type: Number },
  title: { type: String, required: false },
  price: { type: Number, required: false },
  review: { type: String, required: false },
  description: { type: String, required: false },
  Imageurl: { type: String, required: false },
  Quantity: { type: Number, required: false },
  discountprice: { type: Number, required: false },
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: false },
  stockStatus: { type: String, enum: ['In Stock', 'Out of Stock'], default: 'In Stock', required: false },
  sale: { type: Boolean, required: false },
  newprice: { type: Number, required: false },
  category: { type: String, enum: ['Cloths', 'Watches', 'Jackets'], required: true }
});

const WatchModel = ProductModel.discriminator("Watch", WatchSchema);
module.exports = WatchModel;
