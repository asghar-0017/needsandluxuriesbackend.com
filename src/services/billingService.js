const dataInRepo = require('../Repository/billingRepository');
const billingDetailMail = require('../mediater/billingDetail');

const createBillingDetail = async (data) => {
  try {
    const sendEmail = await billingDetailMail(data);
    if (sendEmail) {
      const result = await dataInRepo.createBillingDetail(data);
      return result;
    }
  } catch (error) {
    throw error;
  }
};
const getAllBillingDetails = async () => {
  try {
    return await dataInRepo.getAllBillingDetails();
  } catch (error) {
    throw error;
  }
};

const updateBillingDetail = async (id, updateData) => {
  try {
    return await dataInRepo.updateBillingDetail(id, updateData);
  } catch (error) {
    throw error;
  }
};

const deleteBillingDetail = async (id) => {
  try {
    return await dataInRepo.deleteBillingDetail(id);
  } catch (error) {
    throw error;
  }
};

const changeOrderStatus = async (id, newStatus) => {
  try {
    return await dataInRepo.changeOrderStatus(id, newStatus);
  } catch (error) {
    throw error;
  }
};

const getOrderStatusCounts = async () => {
    try {
      const result = await dataInRepo.getOrderStatusCounts();
      return result;
    } catch (error) {
      throw error;
    }
}

const calculateTotalSalesOfFulfilledOrders = async () => {
  try {
    return await dataInRepo.calculateTotalSalesOfFulfilledOrders();
  } catch (error) {
    throw error;
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
