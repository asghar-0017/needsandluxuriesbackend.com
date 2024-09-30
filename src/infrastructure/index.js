const mongoose = require("mongoose")

const ConnectDB = async ()=>{
  const uri = 'mongodb://mongo:mhhmHPGFAnmJebQVLhGurvdXbvGsAbHH@autorack.proxy.rlwy.net:28421';

  // Connect to MongoDB using Mongoose (without deprecated options)
  mongoose.connect(uri,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000
  })
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Failed to connect to MongoDB', err));
}

module.exports = {ConnectDB}

