const {
  billingDetails,
  getAllBillingDetails,
  updateBillingDetail,
  deleteBillingDetail,
  changeOrderStatus,
  orderStatusCounts,
  getOrderByOrderId,
  getTotalSalesOfFulfilledOrders,
  getTotalSalesOfDate  
} = require("../controllers/billingController.js");
const { cloudinary, upload } = require("../services/ImageService.js");

const billingRoute = (app) => {

  app.post('/create-billing-detail', upload.fields([
    { name: 'cashOnDeliveryImage', maxCount: 1 },
    { name: 'stitchImage', maxCount: 10 } 
  ]), billingDetails);
  app.get("/billing-details", getAllBillingDetails);
  app.put("/billing-details/:orderId", upload.fields([{ name: 'cashOnDeliveryImage', maxCount: 1 }, { name: 'stitchImage', maxCount: 1 }]), updateBillingDetail);
  app.delete("/billing-details/:orderId", deleteBillingDetail);
  app.put("/billing-status/:id", changeOrderStatus);
  app.get("/order-status-counts", orderStatusCounts); 
  app.get('/get-order-by-orderId/:orderId',getOrderByOrderId)

  app.get("/total-sales/fulfilled", getTotalSalesOfFulfilledOrders);

  app.get("/total-sales-of-date/:date", getTotalSalesOfDate); 


};

module.exports = billingRoute;
