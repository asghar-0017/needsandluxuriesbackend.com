const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid'); // Importing UUID for random order ID generation



const billingSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  address: {
    type: String
  },
  apartment: {
    type: String
  },
  postCode: {
    type: Number
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  additionalInformation: {
    type: String
  },
  orderId:{
    type: Number,
  },
  orderDate:{
    type: Date,
    default: Date.now 
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      title:{
        type: String
      },
      quantity: {
        type: Number
      },
      price: {
        type: Number
      },
      Imageurl:{
        type:String
      },
    }
  ]
});

module.exports = BillingModel = mongoose.model("BillingDetail", billingSchema);
