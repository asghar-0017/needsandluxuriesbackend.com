const sendDataInService = require("../services/billingService");
const dataInRepo = require('../Repository/billingRepository');
const billingDetailModel = require('../model/billingDetail');
const stretchDataModel = require('../model/stratchModel');
const generateOrderId= require('../mediater/generateOrderId')
const { cloudinary,upload } = require('../services/ImageService'); 
const StretchModel = require('../model/stratchModel'); // Import the Stretch model



const billingDetail = async (req, res) => {
  try {
    const data = req.body;
    let products = req.body.products;
    if (typeof products === 'string') {
      products = JSON.parse(products);
    }

    data.cashOnDelivery = data.cashOnDelivery === 'true' || data.cashOnDelivery === true;
    data.isStitching = data.isStitching === 'true' || data.isStitching === true;
    const orderId = generateOrderId();
    data.orderId = orderId;

    // Upload cashOnDeliveryImage if present
    if (req.files && req.files.cashOnDeliveryImage) {
      const cashOnDeliveryImageFile = req.files.cashOnDeliveryImage[0];
      const cashOnDeliveryResult = await cloudinary.uploader.upload(cashOnDeliveryImageFile.path);
      data.cashOnDeliveryImage = cashOnDeliveryResult.secure_url;
    }

    let stretchData;
    if (data.isStitching) {
      if (typeof data.stretchData === 'string') {
        data.stretchData = JSON.parse(data.stretchData);
      }

      if (req.files && req.files.stitchImage ) {
        const stitchingImageFile = req.files.stitchImage[0];
        const stitchingResult = await cloudinary.uploader.upload(stitchingImageFile.path);
        data.stitchImage = stitchingResult.secure_url; // Assign valid string URL
      } else {
        data.stitchImage = null; // Handle case where no image was uploaded
      }

      data.stretchData.orderId = orderId;
      stretchData = await StretchModel.create(data.stretchData);
    }

    const previousOrderCount = await billingDetailModel.countDocuments();
    data.orderCount = previousOrderCount + 1;

    const billingDetailData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      phone: data.phone,
      postCode: data.postCode,
      additionalInformation: data.additionalInformation,
      apartment: data.apartment,
      cashOnDelivery: data.cashOnDelivery,
      cashOnDeliveryImage: data.cashOnDeliveryImage,
      orderId: data.orderId,
      orderCount: data.orderCount,
      products: products,
      stretchData: stretchData
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
    const result = await billingDetailModel.find().populate('stretchData');
    res.status(200).json({ message: 'Billing details fetched successfully.', result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

const updateBillingDetail = async (req, res) => {
  try {
    const { orderId } = req.params; 
    let updateBillingData = req.body; 
    const stretchDataUpdate = req.body.stretchData;

    const billingDetail = await billingDetailModel.findOne({ orderId }).populate('stretchData');

    if (!billingDetail) {
      return res.status(404).json({ message: 'Billing detail not found with the given orderId.' });
    }

    Object.assign(billingDetail, updateBillingData);
    await billingDetail.save(); 

    if (stretchDataUpdate && billingDetail.stretchData) {
      const stretchData = await stretchDataModel.findOne({ orderId });

      if (stretchData) {
        Object.assign(stretchData, stretchDataUpdate); 
        await stretchData.save(); 
      } else {
        return res.status(404).json({ message: 'Stretch data not found with the given orderId.' });
      }
    }

    res.status(200).json({
      message: 'Billing and stretch data updated successfully.',
      billingDetail,
      stretchData: billingDetail.stretchData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error.', error: err.message });
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
    const order = await billingDetailModel
      .findOne({ orderId }).populate('stretchData');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
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
