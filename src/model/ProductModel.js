const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  title:{
    type:String,
    require:false
  },
  price:{
    type:Number,
    require:false
  },
  review:{
    type:String,
    require:false
  },
  description:{
    type:String,
    require:false
  },
  Imageurl:{
    type:String,
    require:false
  },
  Quantity:{
    type:Number,
    require:false
  },
  discountprice:{
    type:Number,
    require:false
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    require:false
  },
  stockStatus: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
    default: 'In Stock',
    require:false
  },
  sale:{
    type:Boolean,
    require:false
  },
  collection:{
  type: String,
  require:false

  },
  subCollection:{
    type: String,
    require:false
  
    },
  isStitching:{
    type:Boolean,
    require:false

  },
  stitchedPrice:{
    type:Number,
    require:false
  },
  stitchImage: {
    type: String,
    require:false
  },
  newprice:{
    type:Number,
    require:false
  },
  category: { type: String, enum: ['Clothes', 'Watches', 'Jackets'], required: true },
  subCategory:{
    type:String,
    require:false
  },
  weight:{
    type: Number,
    require:false
  },
  materials: {
    type: [String],
    require:false
  },
  otherInfo:{
    type:String,
    require:false
},

})
ProductSchema.statics.validCategories = ['Clothes', 'Watches', 'Jackets'];

module.exports = ProductModel = mongoose.model("Product",ProductSchema)
/*const mongoose = require("mongoose");

// StretchData Schema
const stretchDataSchema = new mongoose.Schema({
  customerName: { type: String },
  orderId: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  kameez: {
    bustCircumference: { type: Number },
    waistCircumference: { type: Number },
    hipCircumference: { type: Number },
    shoulderWidth: { type: Number },
    kameezLength: { type: Number },
    sleeveLength: { type: Number },
    armholeCircumference: { type: Number },
    bicepCircumference: { type: Number },
    neckCircumference: { type: Number },
    frontNeckDepth: { type: Number },
    shoulderToWaistLength: { type: Number },
    sleeveOpeningCircumference: { type: Number },
  },
  shalwar: {
    waistCircumference: { type: Number },
    hipCircumference: { type: Number },
    thighCircumference: { type: Number },
    inseamLength: { type: Number },
    outseamLength: { type: Number },
    ankleOpening: { type: Number },
    rise: { type: Number },
    crotchDepth: { type: Number },
  },
  fitPreferences: {
    kameezFit: {
      type: String,
      enum: ["fitted", "semi-fitted", "loose"],
    },
    sleeveStyle: {
      type: String,
      enum: ["full", "three-quarter", "half", "sleeveless"],
    },
    pantStyle: {
      type: String,
      enum: ["traditional", "churidar", "straight-cut"],
    },
    necklineStyle: {
      type: String,
      enum: ["v-neck", "round neck", "boat neck", "custom"],
    },
  },
});

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  Imageurl: {
    type: String,
    required: false,
  },
  Quantity: {
    type: Number,
    required: false,
  },
  discountprice: {
    type: Number,
    required: false,
  },
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
  sale: {
    type: Boolean,
    required: false,
  },
  collection: {
    type: String,
    required: false,
  },
  isStitching: {
    type: Boolean,
    required: false,
  },
  stitchedPrice: {
    type: Number,
    required: false,
  },
  stitchImage: {
    type: String,
    required: false,
  },
  newprice: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    enum: ['Clothes', 'Watches', 'Jackets'],
    required: true,
  },
  subCategory: {
    type: String,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  materials: {
    type: [String],
    required: false,
  },
  otherInfo: {
    type: String,
    required: false,
  },
  stretchData: [stretchDataSchema], 
});

ProductSchema.statics.validCategories = ['Clothes', 'Watches', 'Jackets'];

module.exports = ProductModel = mongoose.model("Product", ProductSchema);
*/ 