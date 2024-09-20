const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  title:{
    type:String
  },
  price:{
    type:String
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
  }
})

module.exports = ProductModel = mongoose.model("Product",ProductSchema)