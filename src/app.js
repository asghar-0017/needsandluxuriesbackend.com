const express = require("express");
const { ConnectDB } = require("./infrastructure/index.js");
const Routes = require("./routes/ReviewRoute.js");
const ReviewRoute = require("./routes/clientroute.js");
const ProductRoute = require("./routes/ProductRoute.js")
const CartRoute = require("./routes/Cartroute.js")
const app = express();
const cors = require("cors")


app.use(cors({
  origin: "*",
}))
app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
  
  Routes(app);
  ReviewRoute(app);
  ProductRoute(app);
  CartRoute(app)
  
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  const start = () => {
    ConnectDB()
      .then(() => {
        app.listen({port:3000,host:'0.0.0.0'}, () => {
          console.log("Server is running on port 3000");
        });
        console.log("DB connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  

module.exports= {start}