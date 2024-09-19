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
reviewTitle:{
    type:String
},
reviewMessage:{
    type:String
},
})

module.exports = ReviewModel = mongoose.model("Review",ReviewSchema)