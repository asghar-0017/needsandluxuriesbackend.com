const mongoose = require("mongoose")

const AdditionalSchema = new mongoose.Schema({
  weight:{
    type:String
  },
  dimensions:{
    type:String
  },
materials:{
    type:String
},
otherinfo:{
    type:String
},
productId:{
    type:String
},
})

module.exports = AdditionalModel = mongoose.model("Additional",AdditionalSchema)