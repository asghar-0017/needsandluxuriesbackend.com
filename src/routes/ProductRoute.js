const { CreateProduct, upload, GetProduct, GetOneProduct,productUpdate,deleteProduct,GetProductCategory,UpdateProductByCollection,DeleteProductByCollection,GetProductCollection,GetProductByCollection } = require("../controllers/ProductController.js");
  const Routes = (app) => {

    app.post("/create", upload.single("image"), CreateProduct);
    app.put('/product-update/:id',upload.single("image"), productUpdate); 
    app.delete('/product-delete/:id', deleteProduct);  
    app.get("/get-product",GetProduct);
    
    app.get("/get-product-by-collection",GetProductByCollection);
    app.get("/get-product/:id",GetOneProduct);
    app.get("/get-product-collection",GetProductCollection);
    app.get("/get-product-category",GetProductCategory);

    app.put("/update-product-by-collection/:id",upload.single("image"),  UpdateProductByCollection);
    app.delete("/delete-product-by-collection/:id", DeleteProductByCollection);
    

  };
  
  module.exports = Routes;
  