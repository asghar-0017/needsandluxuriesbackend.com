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
    type:String
  },
  discountprice:{
    type:Number
  },
  sale:{
    type:Boolean
  }
})

module.exports = ProductModel = mongoose.model("Product",ProductSchema)