const {
  CreateReview,
  ShowReview,
  GetSingleReview
} = require("../controllers/ReviewController.js");
const Routes = (app) => {
  app.post("/create-review/:id", CreateReview);
  app.get("/get-reviews/:id",GetSingleReview)
  app.get("/get-reviews", ShowReview);
};

module.exports = Routes; 
