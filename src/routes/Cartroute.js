const {
    CreateCart,upload, GetFromCart,DeleteFromCart,UpdateCart
  } = require("../controllers/AddtoCartController.js");

  const Routes = (app) => {
    app.post("/create-cart/:id",upload.single("image"), CreateCart);
    app.get("/get-cart",GetFromCart)
    app.delete("/delete-cart/:id",DeleteFromCart)
    app.put("/update-cart/:id",UpdateCart)
  };
  
  module.exports = Routes; 
  