const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  title:{
    type:String
  },
  price:{
    type:Number
  },
  review:{
    type:String
  },
  description:{
    type:String
  },
  Imageurl:{
    type:String
  },
  Quantity:{
    type:Number
  },
  discountprice:{
    type:Number
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  stockStatus: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
    default: 'In Stock',
  },
  sale:{
    type:Boolean
  },
  collection:{
    type: String,
  },
  newprice:{
    type:Number
  },
  category: {
    type: String,
  },
  weight:{
    type: Number,
  },
  materials: {
    type: [String],
  },
  otherInfo:{
    type:String
},
})
ProductSchema.statics.validCategories = ['Child', 'Men', 'Women'];

module.exports = ProductModel = mongoose.model("Product",ProductSchema)