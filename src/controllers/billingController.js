const sendDataInService = require("../services/billingService");
const dataInRepo = require('../Repository/billingRepository');


const billingDetail = async (req, res) => {
  try {
    const data = req.body;
     const existingBillingDetail = await dataInRepo.getAllBillingDetails();
     const previousOrderCount = existingBillingDetail.length > 0 ? existingBillingDetail[0].orderCount : 0;
     data.orderCount = previousOrderCount + 1;
    const result = await sendDataInService.createBillingDetail(data);
    res.status(200).json({ message: 'Billing detail created successfully.', result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

const getAllBillingDetails = async (req, res) => {
  try {
    const result = await sendDataInService.getAllBillingDetails();
    res.status(200).json({ message: 'Billing details fetched successfully.', result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

const updateBillingDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const result = await sendDataInService.updateBillingDetail(id, updateData);
    res.status(200).json({ message: 'Billing detail updated successfully.', result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

const deleteBillingDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await sendDataInService.deleteBillingDetail(id);
    res.status(200).json({ message: 'Billing detail deleted successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    console.log("Api Hit")
    const result = await sendDataInService.changeOrderStatus(id, newStatus);
    res.status(200).json({ message: 'Order status updated successfully.', result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};
const orderStatusCounts = async (req, res) => {
  try {
    const result = await sendDataInService.getOrderStatusCounts();
    res.status(200).json({ message: 'Order status counts fetched successfully.', result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

const getOrderByOrderId=async()=>{
  try{
    
  }catch(error){

  }

}

console.log("VAr",abc)

module.exports = {
  billingDetail,
  getAllBillingDetails,
  updateBillingDetail,
  deleteBillingDetail,
  changeOrderStatus,
  orderStatusCounts,
  getOrderByOrderId
};
