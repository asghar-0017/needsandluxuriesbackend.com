const {
  billingDetail,
  getAllBillingDetails,
  updateBillingDetail,
  deleteBillingDetail,
  changeOrderStatus,
  orderStatusCounts,
  getOrderByOrderId
} = require("../controllers/billingController.js");
const { cloudinary, upload } = require("../services/ImageService.js");

const billingRoute = (app) => {
  app.post("/create-billing-detail",   upload.fields([{ name: 'cashOnDeliveryImage', maxCount: 1 }, { name: 'stitchingImage', maxCount: 1 }]), 
  billingDetail);
  app.get("/billing-details", getAllBillingDetails);
  app.put("/billing-details/:id", updateBillingDetail);
  app.delete("/billing-details/:id", deleteBillingDetail);
  app.put("/billing-status/:id", changeOrderStatus);
  app.get("/order-status-counts", orderStatusCounts); 
  app.get('/get-order-by-orderId/:orderId',getOrderByOrderId)

};

module.exports = billingRoute;
