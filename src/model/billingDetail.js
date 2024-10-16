const mongoose = require("mongoose");
const StretchModel = require('./stratchModel'); // Import the Stretch model


const billingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  apartment: { type: String },
  postCode: { type: Number },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  additionalInformation: { type: String },
  orderId: { type: Number },
  orderDate: { type: Date, default: Date.now },
  cashOnDelivery: { type: Boolean, default: true },
  cashOnDeliveryImage: { type: String },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number },
    Imageurl: { type: String },
    isStitched:{ type:Boolean},
    stitchedPrice:{ type:Number},
  }],
  orderStatus: {
    type: String,
    enum: ['Pending', 'Dispatched', 'Cancelled'],
    default: 'Pending',
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['Pending', 'Dispatched', 'Cancelled'],
      default: 'Pending',
    },
    date: { type: Date, default: Date.now },
  }],
  orderCount: { type: Number },


    stretchData: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'StretchData',  // Referencing the StretchModel
      required: false 
    }
});


billingSchema.methods.updateOrderStatus = function (newStatus) {
  this.orderStatus = newStatus;
  this.statusHistory.push({ status: newStatus });
  return this.save();
};

module.exports = mongoose.model("BillingDetail", billingSchema);


