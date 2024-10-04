const axios = require('axios');
const easypaisaConfig = require('../config/easyPaisaConfig');

exports.initiatePayment = async (amount, orderId) => {
    const paymentData = {
        merchantId: easypaisaConfig.merchantId,
        storeId: easypaisaConfig.storeId,
        transactionAmount: amount,
        transactionReferenceNumber: orderId,
        postBackURL: easypaisaConfig.redirectUrl,
        autoRedirect: true
    };

    try {
        const response = await axios.post(`${easypaisaConfig.apiUrl}/transaction/initiate`, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${easypaisaConfig.secretKey}`
            }
        });

        if (response.data.success) {
            return response.data.paymentURL;
        } else {
            throw new Error('Failed to initiate payment');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.validatePayment = async (status, transactionId) => {
    if (status !== 'success') {
        throw new Error('Payment failed');
    }

    // You can also call the EasyPaisa API to validate the payment status by transactionId
    return { message: 'Payment successful', transactionId };
};
