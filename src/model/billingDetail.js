// models/BillingDetail.js
const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  apartment: { type: String },
  postCode: { type: Number },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  additionalInformation: { type: String },
  orderId: { type: String },
  orderDate: { type: Date, default: Date.now },
  cashOnDelivery: { type: Boolean, default: true },
  cashOnDeliveryImage: { type: String },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number },
    Imageurl: { type: String },
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

  isStitching: { type: Boolean, default: false },
  stitchingImage:{type: String, required: false},
  customerName: { type: String, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  stitchImage: { type: String, required: false }, 

  kameezBustCircumference: { type: Number, required: false },
  kameezWaistCircumference: { type: Number, required: false },
  kameezHipCircumference: { type: Number, required: false },
  kameezShoulderWidth: { type: Number, required: false },
  kameezLength: { type: Number, required: false },
  kameezSleeveLength: { type: Number, required: false },
  kameezArmholeCircumference: { type: Number, required: false },
  kameezBicepCircumference: { type: Number, required: false },
  kameezNeckCircumference: { type: Number, required: false },
  kameezFrontNeckDepth: { type: Number, required: false },
  kameezShoulderToWaistLength: { type: Number, required: false },
  kameezSleeveOpeningCircumference: { type: Number, required: false },

  shalwarWaistCircumference: { type: Number, required: false },
  shalwarHipCircumference: { type: Number, required: false },
  shalwarThighCircumference: { type: Number, required: false },
  shalwarInseamLength: { type: Number, required: false },
  shalwarOutseamLength: { type: Number, required: false },
  shalwarAnkleOpening: { type: Number, required: false },
  shalwarRise: { type: Number, required: false },
  shalwarCrotchDepth: { type: Number, required: false },

  kameezFit: { 
    type: String, 
    enum: ['fitted', 'semi-fitted', 'loose', ''], 
    required: false 
  },
  sleeveStyle: { 
    type: String, 
    enum: ['full', 'three-quarter', 'half', 'sleeveless', ''], 
    required: false 
  },
  pantStyle: { 
    type: String, 
    enum: ['traditional', 'churidar', 'straight-cut', ''], 
    required: false 
  },
  necklineStyle: { 
    type: String, 
    enum: ['v-neck', 'round neck', 'boat neck', 'custom', ''], 
    required: false 
  },
});

billingSchema.methods.updateOrderStatus = function (newStatus) {
  this.orderStatus = newStatus;
  this.statusHistory.push({ status: newStatus });
  return this.save();
};

module.exports = mongoose.model("BillingDetail", billingSchema);
