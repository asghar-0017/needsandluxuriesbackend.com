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
      stitchImage: { type: String },
      stretchData: [
        {
          customerName: { type: String, required: true },
          orderId: { type: Number },
          height: { type: Number, required: true },
          weight: { type: Number, required: true },
          kameez: {
            bustCircumference: { type: Number, required: true },
            waistCircumference: { type: Number, required: true },
            hipCircumference: { type: Number, required: true },
          },
          shalwar: {
            waistCircumference: { type: Number, required: true },
            hipCircumference: { type: Number, required: true },
          },
          fitPreferences: {
            kameezFit: {
              type: String,
              enum: ["fitted", "semi-fitted", "loose"],
              required: true,
            },
            sleeveStyle: {
              type: String,
              enum: ["full", "three-quarter", "half", "sleeveless"],
              required: true,
            },
            pantStyle: {
              type: String,
              enum: ["traditional", "churidar", "straight-cut"],
              required: true,
            },
            necklineStyle: {
              type: String,
              enum: ["v-neck", "round neck", "boat neck", "custom"],
              required: true,
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
