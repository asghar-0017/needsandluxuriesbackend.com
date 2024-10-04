const express = require('express');
const easypaisaController = require('../controllers/easypaisaController');
const router = express.Router();

router.post('/payment', easypaisaController.initiatePayment);
router.get('/payment/callback', easypaisaController.paymentCallback);

module.exports = router;
