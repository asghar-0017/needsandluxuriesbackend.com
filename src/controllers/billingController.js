const sendDataInService = require("../services/billingService");
const dataInRepo = require("../Repository/billingRepository");
const billingDetailModel = require("../model/billingDetail");
const stretchDataModel = require("../model/stratchModel");
const generateOrderId = require("../mediater/generateOrderId");
const { cloudinary, upload } = require("../services/ImageService");
const StretchModel = require("../model/stratchModel"); 

// const billingDetail = async (req, res) => {
//   try {
//     const data = req.body;
//     console.log("Data", data);
//     let products = req.body.products;

//     if (!data.cashOnDelivery && !data.cashOnDeliveryImage) {
//       return res.status(400).json({
//         message:
//           "Please upload an image if the payment method is not Cash on Delivery.",
//       });
//     }
//     if (typeof products === "string") {
//       products = JSON.parse(products);
//     }

//     data.cashOnDelivery =
//       data.cashOnDelivery === "true" || data.cashOnDelivery === true;

//     const orderId = generateOrderId();
//     data.orderId = orderId;

//     if (req.files && req.files.cashOnDeliveryImage) {
//       const cashOnDeliveryImageFile = req.files.cashOnDeliveryImage[0];
//       const cashOnDeliveryResult = await cloudinary.uploader.upload(
//         cashOnDeliveryImageFile.path
//       );
//       data.cashOnDeliveryImage = cashOnDeliveryResult.secure_url;
//     }

//     for (let i = 0; i < products.length; i++) {
//       let product = products[i];

//       product.isStitching = Boolean(
//         product.isStitching === "true" || product.isStitching === true
//       );

//       if (product.isStitching && req.files && req.files.stitchImage) {
//         const stitchingImageFile = req.files.stitchImage[i];
//         const stitchingResult = await cloudinary.uploader.upload(
//           stitchingImageFile.path
//         );
//         product.stitchImage = stitchingResult.secure_url;
//       }

//       if (product.category==="Clothes" && product.isStitching) {
//         let stretchData = data.stretchData[i];

//         if (typeof stretchData === "string") {
//           stretchData = JSON.parse(stretchData);
//         }

//         data.stretchData.orderId = orderId;

//         product.stretchData = stretchData;
//       }
//     }

//     const previousOrderCount = await billingDetailModel.countDocuments();
//     data.orderCount = previousOrderCount + 1;

//     const billingDetailData = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       address: data.address,
//       phone: data.phone,
//       postCode: data.postCode,
//       additionalInformation: data.additionalInformation,
//       apartment: data.apartment,
//       cashOnDelivery: data.cashOnDelivery,
//       cashOnDeliveryImage: data.cashOnDeliveryImage,
//       orderId: data.orderId,
//       orderCount: data.orderCount,
//       products: products,
//     };

//     const result = await billingDetailModel.create(billingDetailData);

//     res.status(200).json({
//       message: "Billing detail created successfully.",
//       data: result,
//     });
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error.", error: err.message });
//   }
// };

const billingDetail = async (req, res) => {
  try {
    const data = req.body;
    let products = data.products;

    if (typeof products === "string") {
      try {
        products = JSON.parse(products);
      } catch (err) {
        return res.status(400).json({ message: "Invalid JSON format in products field." });
      }
    }

    data.cashOnDelivery = data.cashOnDelivery === "true" || data.cashOnDelivery === true;
    const orderId = generateOrderId();
    data.orderId = orderId;

    if (req.files && req.files.cashOnDeliveryImage) {
      const cashOnDeliveryImageFile = req.files.cashOnDeliveryImage[0];
      const cashOnDeliveryResult = await cloudinary.uploader.upload(cashOnDeliveryImageFile.path);
      data.cashOnDeliveryImage = cashOnDeliveryResult.secure_url;
    }

    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      product.isStitching = product.isStitching === "true" || product.isStitching === true;
    
      if (product.isStitching && req.files && req.files.stitchImage && req.files.stitchImage[i]) {
        const stitchingImageFile = req.files.stitchImage[i];
        const stitchingResult = await cloudinary.uploader.upload(stitchingImageFile.path);
        product.stitchImage = stitchingResult.secure_url;
      }
    
      console.log("Category", product.category);
    
      if (product.category === "Clothes" && product.isStitching) {
        if (product.stretchData) {
          try {
            // Parse stretchData if it's a string, otherwise leave as it is.
            product.stretchData = typeof product.stretchData === "string"
              ? JSON.parse(product.stretchData)
              : product.stretchData;
    
            // Ensure stretchData is wrapped in an array as required by the schema.
            product.stretchData = Array.isArray(product.stretchData)
              ? product.stretchData
              : [product.stretchData];
          } catch (err) {
            return res.status(400).json({ message: "Invalid JSON format in stretchData field." });
          }
        } else {
          product.stretchData = [];
        }
      } else {
        product.stretchData = [];
      }
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
    };

    const result = await billingDetailModel.create(billingDetailData);

    res.status(200).json({
      message: "Billing detail created successfully.",
      data: result,
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Internal Server Error.", error: err.message });
  }
};




const getAllBillingDetails = async (req, res) => {
  try {
    const result = await billingDetailModel.find();
    res
      .status(200)
      .json({ message: "Billing details fetched successfully.", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// const updateBillingDetail = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     let updateBillingData = req.body;
//     const stretchDataUpdate = req.body.stretchData;

//     const billingDetail = await billingDetailModel
//       .findOne({ orderId })

//     if (!billingDetail) {
//       return res
//         .status(404)
//         .json({ message: "Billing detail not found with the given orderId." });
//     }

//     Object.assign(billingDetail, updateBillingData);
//     await billingDetail.save();

//     if (stretchDataUpdate && billingDetail.stretchData) {
//       const stretchData = await stretchDataModel.findOne({ orderId });

//       if (stretchData) {
//         Object.assign(stretchData, stretchDataUpdate);
//         await stretchData.save();
//       } else {
//         return res
//           .status(404)
//           .json({ message: "Stretch data not found with the given orderId." });
//       }
//     }

//     res.status(200).json({
//       message: "Billing and stretch data updated successfully.",
//       billingDetail,
//       stretchData: billingDetail.stretchData,
//     });
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error.", error: err.message });
//   }
// };

const updateBillingDetail = async (req, res) => {
  try {
    const { orderId } = req.params;
    let updateBillingData = req.body;
    const stretchDataUpdate = req.body.stretchData;

    // Find the billing detail by orderId
    const billingDetail = await billingDetailModel.findOne({ orderId });

    if (!billingDetail) {
      return res
        .status(404)
        .json({ message: "Billing detail not found with the given orderId." });
    }

    // Update the billing data (excluding stretchData)
    Object.assign(billingDetail, updateBillingData);
    await billingDetail.save();

    // Check and update stretchData if it exists in the request
    if (stretchDataUpdate && Array.isArray(stretchDataUpdate)) {
      for (let stretchUpdate of stretchDataUpdate) {
        // Find the stretch data related to this order and product
        const stretchData = billingDetail.stretchData.find(
          (item) => item.productId.toString() === stretchUpdate.productId
        );

        if (stretchData) {
          // Update existing stretch data
          Object.assign(stretchData, stretchUpdate);
        } else {
          // If stretchData doesn't exist for the product, add new stretch data
          billingDetail.stretchData.push(stretchUpdate);
        }
      }

      // Save the updated stretch data
      await billingDetail.save();
    }

    res.status(200).json({
      message: "Billing and stretch data updated successfully.",
      billingDetail,
      stretchData: billingDetail.stretchData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error.",
      error: err.message,
    });
  }
};



const deleteBillingDetail = async (req, res) => {
  try {
    const { orderId } = req.params;
    const billingDetail = await billingDetailModel
      .findOne({ orderId })
    if (!billingDetail) {
      return res.status(404).json({ message: "Billing detail not found." });
    }
    if (billingDetail.stretchData) {
      await stretchDataModel.findByIdAndDelete(billingDetail.stretchData._id);
    }
    await billingDetailModel.findByIdAndDelete(billingDetail._id);
    res.status(200).json({
      message:
        "Billing detail and associated stretch data deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { newStatus } = req.body;
    const result = await sendDataInService.changeOrderStatus(id, newStatus);
    res
      .status(200)
      .json({ message: "Order status updated successfully.", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
const orderStatusCounts = async (req, res) => {
  try {
    const result = await sendDataInService.getOrderStatusCounts();
    res
      .status(200)
      .json({ message: "Order status counts fetched successfully.", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const getOrderByOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await billingDetailModel
      .findOne({ orderId })

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while tracking the order", error });
  }
};

module.exports = {
  billingDetail,
  getAllBillingDetails,
  updateBillingDetail,
  deleteBillingDetail,
  changeOrderStatus,
  orderStatusCounts,
  getOrderByOrderId,
};
