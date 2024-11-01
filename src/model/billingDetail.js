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
  orderId: { type: Number },
  orderDate: { type: Date, default: Date.now },
  cashOnDelivery: { type: Boolean, default: true },
  cashOnDeliveryImage: { type: String },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number },
      Imageurl: { type: String },
      stitchedPrice: { type: Number },
      isStitching: { type: Boolean, default: false },
      stitchImage: { type: String ,default: false},
      category: { type: String , require:false},
      stretchData: [
        {
          customerName: { type: String, required: false },
          orderId: { type: Number },
          height: { type: Number, required: false },
          weight: { type: Number, required: false },
          kameez: {
            bustCircumference: { type: Number, required: false },
            waistCircumference: { type: Number, required: false },
            hipCircumference: { type: Number, required: false },
            shoulderWidth: { type: Number, required: false },
            hipCircumference: { type: Number, required: false },
            kameezLength: { type: Number, required: false },
            sleeveLength: { type: Number, required: false },
            armholeCircumference: { type: Number, required: false },
            bicepCircumference: { type: Number, required: false },
            neckCircumference: { type: Number, required: false },
            frontNeckDepth: { type: Number, required: false },
            shoulderToWaistLength: { type: Number, required: false },
            sleeveOpeningCircumference: { type: Number, required: false },
            sleeveOpeningCircumference: { type: Number, required: false },
          },
          shalwar: {
            waistCircumference: { type: Number, required: false },
            hipCircumference: { type: Number, required: false },
            thighCircumference: { type: Number, required: false },
            inseamLength: { type: Number, required: false },
            outseamLength: { type: Number, required: false },
            ankleOpening: { type: Number, required: false },
            rise: { type: Number, required: false },
            crotchDepth: { type: Number, required: false },
          },
          fitPreferences: {
            kameezFit: {
              type: String,
              enum: ["fitted", "semi-fitted", "loose"],
              required: false,
            },
            sleeveStyle: {
              type: String,
              enum: ["full", "three-quarter", "half", "sleeveless"],
              required: false,
            },
            pantStyle: {
              type: String,
              enum: ["traditional", "churidar", "straight-cut"],
              required: false,
            },
            necklineStyle: {
              type: String,
              enum: ["v-neck", "round neck", "boat neck", "custom"],
              required: false,
            },
          },
        },
      ],
    },
  ],
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

billingSchema.methods.updateOrderStatus = function (newStatus) {
  this.orderStatus = newStatus;
  this.statusHistory.push({ status: newStatus });
  return this.save();
};

module.exports = mongoose.model("BillingDetail", billingSchema);
