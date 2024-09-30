const {
    Contactus
  } = require("../controllers/ContactController.js");
  const Routes = (app) => {
    app.post("/create-contact", Contactus);

  };
  
  module.exports = Routes; 
  