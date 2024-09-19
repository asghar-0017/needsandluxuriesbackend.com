const mongoose = require("mongoose")

const ConnectDB = async ()=>{
  try{
   await mongoose.connect("mongodb+srv://sikandersunny2017:VWo4sEgFqok4ol3w@cluster0.0g0br.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("DB connected");
  }
 
  catch(err){
    console.log("Connection error",err);
    
  }
}

module.exports = {ConnectDB}

