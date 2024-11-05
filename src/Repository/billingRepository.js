const billingDetail = require('../model/billingDetail');

const createBillingDetail = async (data) => {
  try {
    const result = await billingDetail.create(data);
    return result;
  } catch (err) {
    console.error('Error saving Billing Detail:', err);
    throw new Error('Error saving Billing Detail');
  }
};

const getAllBillingDetails = async () => {
  try {
    return await billingDetail.find();
  } catch (err) {
    console.error('Error fetching Billing Details:', err);
    throw new Error('Error fetching Billing Details');
  }
};

const updateBillingDetail = async (id, updateData) => {
  try {
    return await billingDetail.findByIdAndUpdate(id, updateData, { new: true });
  } catch (err) {
    console.error('Error updating Billing Detail:', err);
    throw new Error('Error updating Billing Detail');
  }
};

const deleteBillingDetail = async (id) => {
  try {
    return await billingDetail.findByIdAndDelete(id);
  } catch (err) {
    console.error('Error deleting Billing Detail:', err);
    throw new Error('Error deleting Billing Detail');
  }
};

const changeOrderStatus = async (id, newStatus, newFulfillmentStatus) => {
  try {
    const order = await billingDetail.findById(id);
    if (!order) {
      throw new Error(`Order not found with ID ${id}`);
    }

    order.orderStatus = newStatus;
    order.fullfillment = newFulfillmentStatus;  
    order.statusHistory.push({
      status: newStatus,
      date: new Date()
    });


    if(newStatus==="Dispatched"){
    order.fullfillment = newStatus === "Dispatched" ? "Fullfilled" : "Unfullfilled";
    }
    return await order.save();
  } catch (err) {
    console.error("Error updating Order Status:", err);
    throw new Error("Error updating Order Status");
  }
};


const getOrderStatusCounts = async () => {
  try {
    const counts = await billingDetail.aggregate([
      { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
    ]);
    return counts;
  } catch (err) {
    console.error('Error fetching Order Status Counts:', err);
    throw new Error('Error fetching Order Status Counts');
  }
};
const logFulfilledOrders = async () => {
  try {
    const orders = await billingDetail.find({ fulfillment: "Fullfilled" });
    console.log("All Fulfilled Orders:", orders);
  } catch (error) {
    console.error("Error retrieving fulfilled orders:", error);
  }
};

// Function to calculate total sales of fulfilled orders
const calculateTotalSalesOfFulfilledOrders = async () => {
  try {
    logFulfilledOrders()
    // Aggregate to get total sales of fulfilled products
    const fulfilledOrders = await billingDetail.aggregate([
      { $match: { fulfillment: "Fullfilled" } }, // Check for fulfilled orders
      { $unwind: "$products" }, // Unwind products array
      {
        $group: {
          _id: null,
          totalSales: { $sum: { $multiply: ["$products.price", "$products.quantity"] } } 
        }
      }
    ]);

    console.log("Fulfilled Orders:", fulfilledOrders); // Debugging log

    // Return the total sales, or 0 if no fulfilled orders found
    return fulfilledOrders.length > 0 ? fulfilledOrders[0].totalSales : 0;
  } catch (error) {
    console.error("Error calculating total sales for fulfilled orders:", error);
    throw new Error("Error calculating total sales for fulfilled orders");
  }
};


module.exports = {
  createBillingDetail,
  getAllBillingDetails,
  updateBillingDetail,
  deleteBillingDetail,
  changeOrderStatus,
  getOrderStatusCounts,
  calculateTotalSalesOfFulfilledOrders
};
