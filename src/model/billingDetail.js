const mongoose = require("mongoose");

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
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number
      },
      price: {
        type: Number
      }
    }
  ]
});

module.exports = BillingModel = mongoose.model("BillingDetail", billingSchema);
