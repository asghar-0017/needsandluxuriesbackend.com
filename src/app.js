const express = require("express");
const { ConnectDB } = require("./infrastructure/index.js");
const Routes = require("./routes/ReviewRoute.js");
const ReviewRoute = require("./routes/clientroute.js");
const ProductRoute = require("./routes/ProductRoute.js")
const CartRoute = require("./routes/Cartroute.js")
const AdditionalRoute = require("./routes/AdditionalRoute.js")
const ContactRoute = require("./routes/ContactRoute.js")
const billingRoute=require('./routes/billingRoute.js')
const AdminAuthRoute=require('./routes/adminAuthRoute.js')

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
  AdditionalRoute(app)
  ContactRoute(app)
  billingRoute(app)
  AdminAuthRoute(app)
  
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  const start = () => {
    ConnectDB()
      .then(() => {
        app.listen({port:3001,host:'0.0.0.0'}, () => {
          console.log("Server is running on port 3001");
        });
        console.log("DB connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  

module.exports= {start}