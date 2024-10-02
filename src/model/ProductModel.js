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
  sale:{
    type:Boolean
  },
  newprice:{
    type:Number
  },
  category: {
    type: String,
  },
})
ProductSchema.statics.validCategories = ['Child', 'Men', 'Women'];

module.exports = ProductModel = mongoose.model("Product",ProductSchema)