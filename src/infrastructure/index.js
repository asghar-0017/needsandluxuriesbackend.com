const mongoose = require("mongoose")
require('dotenv').config();

// const uri = 'mongodb://mongo:mhhmHPGFAnmJebQVLhGurvdXbvGsAbHH@autorack.proxy.rlwy.net:28421'
// const uri = 'mongodb://mongo:fQFaEIQpBGALYhYNpCuCcxcWhhRHCFPi@junction.proxy.rlwy.net:46294'; 
// const uri = "mongodb+srv://fa21bscs7860:PyENalk60fjxwBrf@cluster0.nmg20.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://fa21bscs0017:ymqyksQbB5MDRoEp@cluster0.kxhqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const ConnectDB = async ()=>{

  mongoose.connect(uri,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
    connectTimeoutMS: 40000, // 20 seconds

  })
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Failed to connect to MongoDB', err));
}

module.exports = {ConnectDB};

