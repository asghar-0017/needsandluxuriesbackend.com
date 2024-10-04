const mongoose = require("mongoose")
require('dotenv').config();

const uri = 'mongodb://mongo:mhhmHPGFAnmJebQVLhGurvdXbvGsAbHH@autorack.proxy.rlwy.net:28421'; 
// const uri = 'mongodb://mongo:fQFaEIQpBGALYhYNpCuCcxcWhhRHCFPi@junction.proxy.rlwy.net:46294'; 
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

