const mongoose = require("mongoose");

const stretchDataSchema = new mongoose.Schema({
  customerName: { type: String },
  orderId: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  kameez: {
    bustCircumference: { type: Number },
    waistCircumference: { type: Number },
    hipCircumference: { type: Number },
    shoulderWidth: { type: Number },
    kameezLength: { type: Number },
    sleeveLength: { type: Number },
    armholeCircumference: { type: Number },
    bicepCircumference: { type: Number },
    neckCircumference: { type: Number },
    frontNeckDepth: { type: Number },
    shoulderToWaistLength: { type: Number },
    sleeveOpeningCircumference: { type: Number },
  },
  shalwar: {
    waistCircumference: { type: Number },
    hipCircumference: { type: Number },
    thighCircumference: { type: Number },
    inseamLength: { type: Number },
    outseamLength: { type: Number },
    ankleOpening: { type: Number },
    rise: { type: Number },
    crotchDepth: { type: Number },
  },
  fitPreferences: {
    kameezFit: {
      type: String,
      enum: ["fitted", "semi-fitted", "loose",""],
      required:false
    },
    sleeveStyle: {
      type: String,
      enum: ["full", "three-quarter", "half", "sleeveless",""],
      required:false

    },
    pantStyle: {
      type: String,
      enum: ["traditional", "churidar", "straight-cut",""],
      required:false

    },
    necklineStyle: {
      type: String,
      enum: ["v-neck", "round neck", "boat neck", "custom",""],
      required:false

    },
  },
});

const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  title: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number },
  Imageurl: { type: String },
  stitchedPrice: { type: Number },
  isStitching: { type: Boolean, default: true },
  stitchImage: { type: String }, // Change this to String
  category: { type: String },
  stretchData: [stretchDataSchema],
});

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
  products: [productSchema],
  orderStatus: {
    type: String,
    enum: ["Pending", "Dispatched", "Cancelled"],
    default: "Pending",
  },
  statusHistory: [
    {
      status: {
        type: String,
        enum: ["Pending", "Dispatched", "Cancelled"],
        default: "Pending",
      },
      date: { type: Date, default: Date.now },
    },
  ],
  orderCount: { type: Number },
});

// Convert productId to ObjectId if necessary
billingSchema.methods.prepareProducts = function () {
  this.products.forEach((product) => {
    if (typeof product.productId === 'string' && mongoose.Types.ObjectId.isValid(product.productId)) {
      product.productId = mongoose.Types.ObjectId(product.productId);
    }
  });
};

billingSchema.methods.updateOrderStatus = async function (newStatus) {
  this.orderStatus = newStatus;
  this.statusHistory.push({ status: newStatus });
  return this.save();
};

billingSchema.pre('save', function (next) {
  this.prepareProducts();
  next();
});

module.exports = mongoose.model("BillingDetail", billingSchema);
