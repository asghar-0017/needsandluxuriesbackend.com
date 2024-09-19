const { CreateReview, ShowReview } = require("../controllers/ReviewController.js");
const Routes = (app) => {


    app.post("/create-review", CreateReview);
    app.get("/get-reviews",ShowReview)
};

module.exports = Routes; // Export the Routes function directly, not as an object
