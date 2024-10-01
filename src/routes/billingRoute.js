const {
    billingDetail
  } = require("../controllers/billingController.js");
  const billingRoute = (app) => {
    app.post("/create-billing-detail", billingDetail);

  };
  
  module.exports = billingRoute; 
  