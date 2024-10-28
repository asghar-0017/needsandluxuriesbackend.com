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
  discountPrice:{
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
  category: { type: String, enum: ['Cloths', 'Watches', 'Jackets'], required: true },
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
ProductSchema.statics.validCategories = ['Cloths', 'Watches', 'Jackets'];

module.exports = ProductModel = mongoose.model("Product",ProductSchema)
