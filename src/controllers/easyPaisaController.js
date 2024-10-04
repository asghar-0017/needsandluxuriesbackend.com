const easypaisaService = require('../services/easypaisaService');

exports.initiatePayment = async (req, res) => {
    try {
        const { amount, orderId } = req.body; // You can pass these from frontend
        const paymentUrl = await easypaisaService.initiatePayment(amount, orderId);
        res.status(200).json({ url: paymentUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to initiate payment' });
    }
};

exports.paymentCallback = async (req, res) => {
    try {
        const { status, transactionId } = req.query;
        const result = await easypaisaService.validatePayment(status, transactionId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment validation failed' });
    }
};
