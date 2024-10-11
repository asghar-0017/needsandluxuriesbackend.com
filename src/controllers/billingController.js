const sendDataInService = require("../services/billingService");
const dataInRepo = require('../Repository/billingRepository');
const billingDetailModel = require('../model/billingDetail');
const generateOrderId= require('../mediater/generateOrderId')
const { cloudinary,upload } = require('../services/ImageService'); 


const billingDetail = async (req, res) => {
  try {
    const data = req.body;
    let products = req.body.products;

    if (typeof products === 'string') {
      products = JSON.parse(products);
    }
    if (!data.firstName || !data.lastName || !data.email || !data.address || !data.phone) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    data.cashOnDelivery = data.cashOnDelivery === 'true' || data.cashOnDelivery === true;

    if (!data.cashOnDelivery && req.file) {
      const resultData = await cloudinary.uploader.upload(req.file.path);
      data.image = resultData.secure_url;
    }

    data.orderId = generateOrderId();
    const previousOrderCount = await billingDetailModel.countDocuments();
    data.orderCount = previousOrderCount + 1;

    const billingDetailData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      phone: data.phone,
      postCode:data.postCode,
      additionalInformation:data.additionalInformation,
      apartment:data.apartment,
      cashOnDelivery: data.cashOnDelivery,
      image: data.image,
      orderId: data.orderId,
      orderCount: data.orderCount,
      products: products 
    };

    const result = await billingDetailModel.create(billingDetailData);
    res.status(200).json({ message: 'Billing detail created successfully.', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error.', error: err.message });
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
