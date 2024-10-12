const stratchData = require("../controllers/stratchingController");
const { cloudinary, upload } = require("../services/ImageService.js");

  const stratchRoutes = (app) => {
    app.post("/add-stratch-data",upload.single('image'),  stratchData.addStratchData);
 
  };
  
  module.exports = stratchRoutes; 
  