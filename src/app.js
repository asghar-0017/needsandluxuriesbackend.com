const express = require("express");
const { ConnectDB } = require("./infrastructure/index.js");
const Routes = require("./routes/ReviewRoute.js");
const ReviewRoute = require("./routes/clientroute.js");
const ProductRoute = require("./routes/ProductRoute.js")
const app = express();

app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
  
  Routes(app);
  ReviewRoute(app);
  ProductRoute(app);
  
  app.get("/", (req, res) => {
    res.send("hello world");
  });

const start = ()=>{
    ConnectDB()
    .then(() => {
      app.listen(3000, (req, res) => {
        console.log("server is running on port 3000");
      });
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

  

module.exports= {start}