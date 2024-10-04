const {
  billingDetail,
  getAllBillingDetails,
  updateBillingDetail,
  deleteBillingDetail,
  changeOrderStatus,
  orderStatusCounts,
  getOrderByOrderId
} = require("../controllers/billingController.js");

const billingRoute = (app) => {
  app.post("/create-billing-detail", billingDetail);
  app.get("/billing-details", getAllBillingDetails);
  app.put("/billing-details/:id", updateBillingDetail);
  app.delete("/billing-details/:id", deleteBillingDetail);
  app.put("/billing-details/:id/status", changeOrderStatus);
  app.get("/order-status-counts", orderStatusCounts); 
  app.get('/get-order-by-orderId/:id',getOrderByOrderId)

};

module.exports = billingRoute;
