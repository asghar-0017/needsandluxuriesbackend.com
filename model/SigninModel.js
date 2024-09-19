const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  token:{
    type:String
  },
  code:{
    type:String
  },
  phone:{
    type:Number
  },
  gender:{
    type:String
  },
  password:{
    type:String
    }
})

module.exports = ClientModel = mongoose.model("Client",ClientSchema)