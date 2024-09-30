const {
    CreateAdditional,
    ShowAdditional,
    GetSingleAdditional
  } = require("../controllers/AdditionalController.js");
  const Routes = (app) => {
    app.post("/create-info/:id", CreateAdditional);
    app.get("/get-info/:id",GetSingleAdditional)
    app.get("/get-info", ShowAdditional);
  };

  module.exports = Routes; 
  