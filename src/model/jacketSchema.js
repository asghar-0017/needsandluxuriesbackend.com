const mongoose = require("mongoose");
const ProductModel = require("./ProductModel");

const JacketSchema = new mongoose.Schema({
  insulation: { type: String, enum: ['Light', 'Medium', 'Heavy'] },
  waterproof: { type: Boolean, default: false },
  materials: { type: [String] },
  category: { type: String, enum: ['Cloths', 'Watches', 'Jackets'], required: true }
});

const JacketModel = ProductModel.discriminator("Jacket", JacketSchema);
module.exports = JacketModel;
