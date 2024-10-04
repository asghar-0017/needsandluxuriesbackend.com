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
    const order = await billingDetail.findById(id);
    if(!order){
      return `Order Nit Found With Id ${id}`
    }else{
    const currentStatus = order.orderStatus;
      order.orderStatus = newStatus;
    order.statusHistory.push({
      status: newStatus,
      date: new Date() 
    });

    return await order.save();
  }
  } catch (err) {
    console.error('Error updating Order Status:', err);
    throw new Error('Error updating Order Status');
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

module.exports = {
  createBillingDetail,
  getAllBillingDetails,
  updateBillingDetail,
  deleteBillingDetail,
  changeOrderStatus,
  getOrderStatusCounts
};
