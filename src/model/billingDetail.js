const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
  },
  postCode: {
    type: Number,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  additionalInformation: {
    type: String,
  },
  orderId: {
    type: String, 
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

      title: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
      },
      Imageurl: {
        type: String,
      },
    },
  ],
  orderStatus: {
    type: String,
    enum: ['Pending', 'Dispatched', 'Cancelled'],
    default: 'Pending', 
  },
  statusHistory: {
    type: [{
      status: {
        type: String,
        enum: ['Pending', 'Dispatched', 'Cancelled'],
        default: 'Pending',
      },
      date: {
        type: Date,
        default: Date.now,
      }
    }],
    default: function() {
      return [{ status: 'Pending', date: Date.now() }];
    },
  },
  orderCount: {
    type: Number,
  },
 

});
billingSchema.methods.updateOrderStatus = function (newStatus) {
  this.orderStatus = newStatus;
  this.statusHistory.push({ status: newStatus });
  return this.save();
};

module.exports = BillingModel = mongoose.model("BillingDetail", billingSchema);
