// const sendDataInService= require("../services/billingService");
// const dataInRepo = require("../Repository/billingRepository");
const billingDetailModel = require("../model/billingDetail");
const stretchDataModel = require("../model/stratchModel");
// const generateOrderId = require("../mediater/generateOrderId");
// const { cloudinary, upload } = require("../services/ImageService");
const StretchModel = require("../model/stratchModel"); 


// const BillingDetail = require("../model/billingDetail");
// const StitchImage = require("../model/stitchImage");

// const parseProducts = (products) => {
//   if (typeof products === "string") {
//     try {
//       return JSON.parse(products);
//     } catch {
//       throw new Error("Invalid JSON format in products field.");
//     }
//   }
//   return products;
// };

// const uploadImage = async (filePath) => {
//   const result = await cloudinary.uploader.upload(filePath);
//   console.log("Uploaded Image URL:", result.secure_url);
//   return result.secure_url;
// };

// const processProduct = async (product, reqFiles, index) => {
//   product.isStitching = product.isStitching === "true" || product.isStitching === true;
//   product.productId = String(product.productId);
//   product.title = String(product.title);

//   if (product.category === "Clothes" && product.isStitching) {
//     if (reqFiles?.stitchImage?.[index]) {
//       const stitchingImageUrl = await uploadImage(reqFiles.stitchImage[index].path);
//       await StitchImage.create({ productId: product.productId, imageUrl: stitchingImageUrl });
//       product.stitchImage = stitchingImageUrl;
//     }

//     product.stretchData = product.stretchData || []; 
//   } else {
//     delete product.stretchData;
//   }

//   return product;
// };

// const billingDetail = async (req, res) => {
//   try {
//     const data = req.body;
//     data.products = parseProducts(data.products);
//     data.cashOnDelivery = data.cashOnDelivery === "true" || data.cashOnDelivery === true;
//     data.orderId = `ORDER_${Date.now()}`;

//     if (req.files?.cashOnDeliveryImage) {
//       data.cashOnDeliveryImage = await uploadImage(req.files.cashOnDeliveryImage[0].path);
//     }

//     data.products = await Promise.all(data.products.map((product, index) =>
//       processProduct(product, req.files, index)
//     ));
//     // data.orderDate = new Date("2024-12-10T12:32:56.997Z");


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
//       products: data.products,
//       // orderDate: data.orderDate,

//     };

//     const result = await BillingDetail.create(billingDetailData);
//     res.status(200).json({ message: "Billing detail created successfully.", data: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error.", error: err.message });
//   }
// };



const sendDataInService = require("../services/billingService");
const dataInRepo = require("../Repository/billingRepository");
const generateOrderId = require("../mediater/generateOrderId");
const { cloudinary } = require("../services/ImageService");

const BillingDetail = require("../model/billingDetail");
const StitchImage = require("../model/stitchImage");

// const parseProducts = (products) => {
//   if (typeof products === "string") {
//     try {
//       return JSON.parse(products);
//     } catch {
//       throw new Error("Invalid JSON format in products field.");
//     }
//   }
//   return products;
// };

// const uploadImage = async (filePath) => {
//   const result = await cloudinary.uploader.upload(filePath);
//   console.log("Uploaded Image URL:", result.secure_url);
//   return result.secure_url;
// };

// const processProduct = async (product, reqFiles, index) => {
//   product.isStitching = product.isStitching === "true" || product.isStitching === true;
//   product.productId = String(product.productId);
//   product.title = String(product.title);

//   if (product.category === "Clothes" && product.isStitching) {
//     if (reqFiles?.stitchImage?.[index]) {
//       const stitchingImageUrl = await uploadImage(reqFiles.stitchImage[index].path);
//       await StitchImage.create({ productId: product.productId, stitchImage: stitchingImageUrl });
//       product.stitchImage = stitchingImageUrl;
//     }
//     product.stretchData = product.stretchData || [];
//   } else {
//     delete product.stretchData;
//   }

//   return product;
// };

// const billingDetail = async (req, res) => {
//   try {
//     const data = req.body;
//     data.products = parseProducts(data.products);
//     data.cashOnDelivery = data.cashOnDelivery === "true" || data.cashOnDelivery === true;
//     data.orderId = generateOrderId();

//     if (req.files?.cashOnDeliveryImage) {
//       data.cashOnDeliveryImage = await uploadImage(req.files.cashOnDeliveryImage[0].path);
//     }

//     data.products = await Promise.all(
//       data.products.map((product, index) => processProduct(product, req.files, index))
//     );
//     // data.orderDate = new Date("2024-11-07T12:32:56.997Z");

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
//       orderDate:data.orderDate,
//       products: data.products,
//     };

//     const result = await BillingDetail.create(billingDetailData);
//     res.status(200).json({ message: "Billing detail created successfully.", data: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error.", error: err.message });
//   }
// };


const parseProducts = (products) => {
  if (typeof products === "string") {
    try {
      return JSON.parse(products);
    } catch {
      throw new Error("Invalid JSON format in products field.");
    }
  }
  return products;
};

const uploadImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath);
  console.log("Uploaded Image URL:", result.secure_url);
  return result.secure_url;
};

const processProduct = async (product, reqFiles, index) => {
  try {
    product.isStitching = product.isStitching === "true" || product.isStitching === true;
    product.productId = String(product.productId);
    product.title = String(product.title);

    if (product.category === "Clothes" && product.isStitching) {
      if (reqFiles?.stitchImage?.[index]) {
        const stitchingImageUrl = await uploadImage(reqFiles.stitchImage[index].path);
        await StitchImage.create({ productId: product.productId, stitchImage: stitchingImageUrl });
        product.stitchImage = stitchingImageUrl;
      }
      product.stretchData = product.stretchData || [];
    } else {
      delete product.stretchData;
    }
    return product;
  } catch (error) {
    console.error("Error processing product:", error);
    throw error;
  }
};

const billingDetail = async (req, res) => {
  try {
    const data = req.body;
    data.products = parseProducts(data.products);
    data.cashOnDelivery = data.cashOnDelivery === "true" || data.cashOnDelivery === true;
    data.orderId = generateOrderId();

    if (req.files?.cashOnDeliveryImage) {
      data.cashOnDeliveryImage = await uploadImage(req.files.cashOnDeliveryImage[0].path);
    }

    data.products = await Promise.all(
      data.products.map((product, index) => processProduct(product, req.files, index))
    );

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
      orderDate: data.orderDate || new Date(),
      products: data.products,
    };

    const result = await BillingDetail.create(billingDetailData);
    res.status(200).json({ message: "Billing detail created successfully.", data: result });
  } catch (err) {
    console.error("Error creating billing detail:", err);
    res.status(500).json({ message: "Internal Server Error.", error: err.message });
  }
};




const getAllBillingDetails = async (req, res) => {
  try {
    const result = await billingDetailModel.find().lean();
    console.log("Result",result)
    result.forEach((order) => {
      order.products.forEach((product) => {
        if (product.isStitching === false) {
          delete product.stretchData; 
          delete product.Imageurl;
        }
      });
    });

    res.status(200).json({ message: "Billing details fetched successfully.", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error." });
  }
};


const updateBillingDetail = async (req, res) => {
  try {
    const { orderId } = req.params;
    let updateBillingData = req.body;
    const stretchDataUpdate = req.body.stretchData;

    const billingDetail = await billingDetailModel.findOne({ orderId });

    if (!billingDetail) {
      return res
        .status(404)
        .json({ message: "Billing detail not found with the given orderId." });
    }
    Object.assign(billingDetail, updateBillingData);
    await billingDetail.save();

    if (stretchDataUpdate && Array.isArray(stretchDataUpdate)) {
      for (let stretchUpdate of stretchDataUpdate) {
        const stretchData = billingDetail.stretchData.find(
          (item) => item.productId.toString() === stretchUpdate.productId
        );

        if (stretchData) {
          Object.assign(stretchData, stretchUpdate);
        } else {
          billingDetail.stretchData.push(stretchUpdate);
        }
      }
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

const getTotalSalesOfFulfilledOrders = async (req, res) => {
  try {
    const totalSales = await sendDataInService.calculateTotalSalesOfFulfilledOrders();
    res.status(200).json({ totalSales });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getTotalSalesOfDate = async (req, res) => {
  try {
    const date = req.params.date; 
    const totalSales = await sendDataInService.calculateTotalSalesOfDate(date);
    res.status(200).json({ message:`Sales of ${date}`, sales:totalSales });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
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
  getTotalSalesOfFulfilledOrders,
  getTotalSalesOfDate
};
