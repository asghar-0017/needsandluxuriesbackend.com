const sendDataInService = require("../services/billingService");
const dataInRepo = require('../Repository/billingRepository');
const billingDetailModel = require('../model/billingDetail');
const generateOrderId= require('../mediater/generateOrderId')
const { cloudinary,upload } = require('../services/ImageService'); 
const StretchModel = require('../model/stratchModel'); // Import the Stretch model



// const billingDetail = async (req, res) => {
//   try {
//     const data = req.body;
//     let products = req.body.products;

//     if (typeof products === 'string') {
//       products = JSON.parse(products);
//     }
//     if (!data.firstName || !data.lastName || !data.email || !data.address || !data.phone) {
//       return res.status(400).json({ message: "Please fill all required fields." });
//     }

//     data.cashOnDelivery = data.cashOnDelivery === 'true' || data.cashOnDelivery === true;

//     if (!data.cashOnDelivery && req.file) {
//       const resultData = await cloudinary.uploader.upload(req.file.path);
//       data.image = resultData.secure_url;
//     }

//     let stretchData;

//     if (data.isStituching=== 'true' || data.isStituching===true) {
//       stretchData = await StretchModel.create(data.stretchData);
//     }


//     data.orderId = generateOrderId();
//     const previousOrderCount = await billingDetailModel.countDocuments();
//     data.orderCount = previousOrderCount + 1;



//     const billingDetailData = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       address: data.address,
//       phone: data.phone,
//       postCode:data.postCode,
//       additionalInformation:data.additionalInformation,
//       apartment:data.apartment,
//       cashOnDelivery: data.cashOnDelivery,
//       image: data.image,
//       orderId: data.orderId,
//       orderCount: data.orderCount,
//       products: products ,
//       stretchData: stretchData// Reference the stretch data ID

//     };

//     const result = await billingDetailModel.create(billingDetailData);
//     res.status(200).json({ message: 'Billing detail created successfully.', data: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error.', error: err.message });
//   }
// };

// Route to create billing detail with image upload


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
    data.isStitching = data.isStitching === 'true' || data.isStitching === true;

    if (req.files && req.files.cashOnDeliveryImage) {
      const cashOnDeliveryImageFile = req.files.cashOnDeliveryImage[0];
      const cashOnDeliveryResult = await cloudinary.uploader.upload(cashOnDeliveryImageFile.path);
      data.cashOnDeliveryImage = cashOnDeliveryResult.secure_url;
    }

    if (req.files && req.files.stitchingImage) {
      const stitchingImageFile = req.files.stitchingImage[0];
      const stitchingImageResult = await cloudinary.uploader.upload(stitchingImageFile.path);
      data.stitchingImage = stitchingImageResult.secure_url;
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
      postCode: data.postCode,
      additionalInformation: data.additionalInformation,
      apartment: data.apartment,
      cashOnDelivery: data.cashOnDelivery,
      image: data.image || data.cashOnDeliveryImage, 
      orderId: data.orderId,
      orderCount: data.orderCount,
      products: products,
      
      customerName: data.stretch?.customerName || null,
      height: data.stretch?.height || null,
      weight: data.stretch?.weight || null,
      stitchImage: data.stretch?.stitchImage || null,
      
      kameezBustCircumference: data.stretch?.kameez?.bustCircumference || null,
      kameezWaistCircumference: data.stretch?.kameez?.waistCircumference || null,
      kameezHipCircumference: data.stretch?.kameez?.hipCircumference || null,
      kameezShoulderWidth: data.stretch?.kameez?.shoulderWidth || null,
      kameezLength: data.stretch?.kameez?.kameezLength || null,
      kameezSleeveLength: data.stretch?.kameez?.sleeveLength || null,
      kameezArmholeCircumference: data.stretch?.kameez?.armholeCircumference || null,
      kameezBicepCircumference: data.stretch?.kameez?.bicepCircumference || null,
      kameezNeckCircumference: data.stretch?.kameez?.neckCircumference || null,
      kameezFrontNeckDepth: data.stretch?.kameez?.frontNeckDepth || null,
      kameezShoulderToWaistLength: data.stretch?.kameez?.shoulderToWaistLength || null,
      kameezSleeveOpeningCircumference: data.stretch?.kameez?.sleeveOpeningCircumference || null,
    
      shalwarWaistCircumference: data.stretch?.shalwar?.waistCircumference || null,
      shalwarHipCircumference: data.stretch?.shalwar?.hipCircumference || null,
      shalwarThighCircumference: data.stretch?.shalwar?.thighCircumference || null,
      shalwarInseamLength: data.stretch?.shalwar?.inseamLength || null,
      shalwarOutseamLength: data.stretch?.shalwar?.outseamLength || null,
      shalwarAnkleOpening: data.stretch?.shalwar?.ankleOpening || null,
      shalwarRise: data.stretch?.shalwar?.rise || null,
      shalwarCrotchDepth: data.stretch?.shalwar?.crotchDepth || null,
    
      kameezFit: data.stretch?.fitPreferences?.kameezFit || null,
      sleeveStyle: data.stretch?.fitPreferences?.sleeveStyle || null,
      pantStyle: data.stretch?.fitPreferences?.pantStyle || null,
      necklineStyle: data.stretch?.fitPreferences?.necklineStyle || null,
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
    const billingDetails = await billingDetailModel.find();
    res.status(200).json({ message: 'Billing details fetched successfully.', billingDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};
const updateBillingDetail = async (req, res) => {
  try {
    const { id } = req.params;  // Billing detail ID
    let updateData = req.body;

    // If there are uploaded images, process them
    if (req.files && req.files.cashOnDeliveryImage) {
      const cashOnDeliveryImageFile = req.files.cashOnDeliveryImage[0];
      const cashOnDeliveryResult = await cloudinary.uploader.upload(cashOnDeliveryImageFile.path);
      updateData.cashOnDeliveryImage = cashOnDeliveryResult.secure_url;
    }

    if (req.files && req.files.stitchingImage) {
      const stitchingImageFile = req.files.stitchingImage[0];
      const stitchingResult = await cloudinary.uploader.upload(stitchingImageFile.path);
      updateData.stitchingImage = stitchingResult.secure_url;
    }

    if (updateData.isStitching === 'true' || updateData.isStitching === true) {
      if (typeof updateData.stretchData === 'string') {
        updateData.stretchData = JSON.parse(updateData.stretchData); // Parse stitching data if it is in string format
      }

      if (updateData.stretchData && updateData.stretchData._id) {
        await StretchModel.findByIdAndUpdate(updateData.stretchData._id, updateData.stretchData);
      } else {
        const newStretchData = await StretchModel.create(updateData.stretchData);
        updateData.stretchData = newStretchData._id; // Save reference to the new stitching data
      }
    }

    const updatedBillingDetail = await billingDetailModel.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ message: 'Billing detail updated successfully.', result: updatedBillingDetail });
  } catch (err) {
    console.log(err);
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
