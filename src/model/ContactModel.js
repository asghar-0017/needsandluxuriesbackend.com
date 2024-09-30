const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  subject:{
    type:String
  },
  message:{
    type:String
  },
})

module.exports = ContactModel = mongoose.model("Contact",ContactSchema)