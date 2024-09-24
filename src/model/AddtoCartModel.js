const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
  title:{
    type:String
  },
  price:{
    type:Number
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
  },
  newprice:{
    type:Number
  },
  subtotal:{
    type:Number
  }
})

module.exports = ProductModel = mongoose.model("Cart",CartSchema)