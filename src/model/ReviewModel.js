const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
rating:{
    type:String
},
reviewMessage:{
    type:String
},
productId:{
    type:String
},
})

module.exports = ReviewModel = mongoose.model("Review",ReviewSchema)