const sendDataInService = require("../services/billingService");
const dataInRepo = require('../Repository/billingRepository');
const billingDetailModel = require('../model/billingDetail');
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
    // if (!data.firstName || !data.lastName || !data.email || !data.address || !data.phone) {
    //   return res.status(400).json({ message: "Please fill all required fields." });
    // }

    data.cashOnDelivery = data.cashOnDelivery === 'true' || data.cashOnDelivery === true;
    data.isStitching = data.isStitching === 'true' || data.isStitching === true;
    const orderId= generateOrderId();
    data.orderId=orderId

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

      if (req.files && req.files.stitchImage) {
        const stitchingImageFile = req.files.stitchImage[0];
        const stitchingResult = await cloudinary.uploader.upload(stitchingImageFile.path);
        data.stitchImage = stitchingResult.secure_url;
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
      cashOnDeliveryImage:data.cashOnDeliveryImage,
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
    const { orderId } = req.params; // Correctly extract orderId
    let updateData = req.body;

    
    if (req.files && req.files.cashOnDeliveryImage) {
      const cashOnDeliveryImageFile = req.files.cashOnDeliveryImage[0];
      const cashOnDeliveryResult = await cloudinary.uploader.upload(cashOnDeliveryImageFile.path);
      updateData.cashOnDeliveryImage = cashOnDeliveryResult.secure_url;
    }

    if (req.files && req.files.stitchImage) {
      const stitchingImageFile = req.files.stitchImage[0];
      const stitchingResult = await cloudinary.uploader.upload(stitchingImageFile.path);
      updateData.stitchImage = stitchingResult.secure_url;
    }

    if (updateData.isStitching === 'true' || updateData.isStitching === true) {
      if (typeof updateData.stretchData === 'string') {
        updateData.stretchData = JSON.parse(updateData.stretchData);
      }

      if (updateData.stretchData) {
        await StretchModel.findOneAndUpdate(
          { orderId }, // Match StretchModel entry by orderId
          updateData.stretchData,
          { new: true }
        );
      }
    }

    // Update billing detail by orderId
    const updatedBillingDetail = await billingDetailModel.findOneAndUpdate(
      { orderId }, // Match BillingDetail entry by orderId
      updateData,
      { new: true }
    );

    if (!updatedBillingDetail) {
      return res.status(404).json({ message: 'Billing detail not found.' });
    }

    res.status(200).json({ message: 'Billing detail updated successfully.', result: updatedBillingDetail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error.', error: err.message });
  }
};


// const updateBillingDetail = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     let updateData = req.body;

//     if (req.files && req.files.cashOnDeliveryImage) {
//       const cashOnDeliveryImageFile = req.files.cashOnDeliveryImage[0];
//       const cashOnDeliveryResult = await cloudinary.uploader.upload(cashOnDeliveryImageFile.path);
//       updateData.cashOnDeliveryImage = cashOnDeliveryResult.secure_url;
//     }

//     if (req.files && req.files.stitchingImage) {
//       const stitchingImageFile = req.files.stitchingImage[0];
//       const stitchingResult = await cloudinary.uploader.upload(stitchingImageFile.path);
//       updateData.stitchingImage = stitchingResult.secure_url;
//     }

//     if (updateData.isStitching === 'true' || updateData.isStitching === true) {
//       if (typeof updateData.stretchData === 'string') {
//         try {
//           updateData.stretchData = JSON.parse(updateData.stretchData);
//         } catch (error) {
//           return res.status(400).json({ message: 'Invalid JSON format for stretchData.' });
//         }
//       }

//       if (updateData.stretchData && updateData.stretchData.orderId) {
//         const stretchId = updateData.stretchData.orderId;

//         if (!mongoose.Types.ObjectId.isValid(stretchId)) {
//           return res.status(400).json({ message: 'Invalid stretchData orderId.' });
//         }

//         const dataUpdate = await StretchModel.findByIdAndUpdate(
//           stretchId,
//           updateData.stretchData,
//           { new: true }
//         );

//         return res.status(200).json({ message: 'Stretch data updated successfully.', result: dataUpdate });
//       }
//     }

//     const updatedBillingDetail = await billingDetailModel.findOneAndUpdate(
//       { orderId },
//       updateData,
//       { new: true }
//     );

//     res.status(200).json({ message: 'Billing detail updated successfully.', result: updatedBillingDetail });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error.', error: err.message });
//   }
// };

// const updateBillingDetail = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     let updateData = req.body;

//     // Handle cashOnDeliveryImage upload
//     if (req.files?.cashOnDeliveryImage) {
//       const cashOnDeliveryImageFile = req.files.cashOnDeliveryImage[0];
//       const cashOnDeliveryResult = await cloudinary.uploader.upload(cashOnDeliveryImageFile.path);
//       updateData.cashOnDeliveryImage = cashOnDeliveryResult.secure_url;
//     }

//     // Handle stitchImage upload
//     if (req.files?.stitchImage) {
//       const stitchingImageFile = req.files.stitchImage[0];
//       const stitchingResult = await cloudinary.uploader.upload(stitchingImageFile.path);
//       updateData.stitchImage = stitchingResult.secure_url;
//     }

//     if (updateData.isStitching === 'true' || updateData.isStitching === true) {
//       try {
//         if (typeof updateData.stretchData === "string") {
//           updateData.stretchData = JSON.parse(updateData.stretchData);
//         }
//       } catch (error) {
//         return res.status(400).json({ message: "Invalid JSON format for stretchData." });
//       }

//       const stretchUpdate = await StretchModel.findOneAndUpdate(
//         { orderId },  // Match based on orderId
//         updateData.stretchData, 
//         { new: true }
//       );

  
//     }

//     const updatedBillingDetail = await billingDetailModel.findOneAndUpdate(
//       { orderId }, // Match based on orderId
//       updateData,
//       { new: true }
//     );

//     if (!updatedBillingDetail) {
//       return res.status(404).json({ message: "No matching billing detail found." });
//     }

//     // Send success response after both updates
//     res.status(200).json({
//       message: "Billing and stretch data updated successfully.",
//       result: {
//         billingDetail: updatedBillingDetail,
//         stretchData: stretchUpdate || "No stitching data to update",
//       },
//     });
//   } catch (err) {
//     console.error("Error updating billing and stretch data:", err);
//     res.status(500).json({
//       message: "Internal Server Error.",
//       error: err.message,
//     });
//   }
// };



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
