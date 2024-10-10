const sendDataInService = require("../services/billingService");
const dataInRepo = require('../Repository/billingRepository');
const billingDetailModel = require('../model/billingDetail');
const generateOrderId= require('../mediater/generateOrderId')
const { cloudinary, upload } = require("../services/ImageService.js");


const billingDetail = async (req, res) => {
  try {
    const data = req.body;
    data.cashOnDelivery = data.cashOnDelivery === 'true' || data.cashOnDelivery === true;

    if (!data.cashOnDelivery && !data.image) {
      return res.status(400).json({ message: "Image is required when Cash on Delivery is false." });
    }

    if (!data.cashOnDelivery && req.file) {
      try {
        const resultData = await cloudinary.uploader.upload(req.file.path);
        data.image = resultData.secure_url; 
      } catch (uploadError) {
        return res.status(500).json({ message: 'Image upload failed.', error: uploadError.message });
      }
    }
    data.orderId = generateOrderId();
    console.log("OrderId",data.orderId)
    const existingBillingDetails = await dataInRepo.getAllBillingDetails();

    const previousOrderCount = existingBillingDetails.length > 0 
      ? existingBillingDetails.reduce((maxCount, detail) => {
          return Math.max(maxCount, detail.orderCount || 0); 
        }, 0)
      : 0;

    data.orderCount = previousOrderCount + 1; 

    console.log("OrderCount",data.orderCount)
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
    const  id = req.params.id;
    const { newStatus } = req.body;
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

const getOrderByOrderId=async(req,res)=>{
  try {
    const  orderId  = req.params.orderId; 
    console.log("orderId",orderId)
    const order = await billingDetailModel
      .findOne({ orderId })

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Order:", order);
    
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while tracking the order", error });
  }

}



module.exports = {
  billingDetail,
  getAllBillingDetails,
  updateBillingDetail,
  deleteBillingDetail,
  changeOrderStatus,
  orderStatusCounts,
  getOrderByOrderId
};
