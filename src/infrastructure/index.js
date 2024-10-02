const mongoose = require("mongoose")
require('dotenv').config();

const uri = process.env.MONGODB_URI; 
const ConnectDB = async ()=>{

  mongoose.connect(uri,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000
  })
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Failed to connect to MongoDB', err));
}

module.exports = {ConnectDB}

