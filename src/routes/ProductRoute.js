const { CreateProduct, upload, GetProduct, GetOneProduct } = require("../controllers/ProductController.js");
  const Routes = (app) => {

    app.post("/create", upload.single("image"), CreateProduct);
    app.get("/get-product",GetProduct);
    app.get("/get-product/:id",GetOneProduct);
  };
  
  module.exports = Routes; // Export the Routes function directly, not as an object
  