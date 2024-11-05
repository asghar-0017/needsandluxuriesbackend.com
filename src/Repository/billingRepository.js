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

const changeOrderStatus = async (id, newStatus) => {
  try {
    console.log("New Status",newStatus)
    const order = await billingDetail.findById(id);
    if (!order) {
      throw new Error(`Order not found with ID ${id}`);
    }

    order.orderStatus = newStatus;
    order.statusHistory.push({
      status: newStatus,
      date: new Date()
    });

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
    const orders = await billingDetail.find({ orderStatus: "Fullfilled" }); // Updated field name
    console.log("All Fulfilled Orders:", orders);
  } catch (error) {
    console.error("Error retrieving fulfilled orders:", error);
  }
};

const calculateTotalSalesOfFulfilledOrders = async () => {
  try {
    logFulfilledOrders();

    const fulfilledOrders = await billingDetail.aggregate([
      { $match: { orderStatus: "Fullfilled" } },
      { $unwind: "$products" },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: {
              $add: [
                { $multiply: ["$products.price", "$products.quantity"] },
                { $cond: { if: { $gt: ["$products.stitchedPrice", 0] }, then: "$products.stitchedPrice", else: 0 } }
              ]
            }
          }
        }
      }
    ]);

    console.log("Fulfilled Orders:", fulfilledOrders);

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
