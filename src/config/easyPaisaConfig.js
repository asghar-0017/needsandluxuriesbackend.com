require('dotenv').config();

const easypaisaConfig = {
    apiUrl: process.env.EASYPAISA_API_URL,
    merchantId: process.env.EASYPAISA_MERCHANT_ID,
    storeId: process.env.EASYPAISA_STORE_ID,
    secretKey: process.env.EASYPAISA_SECRET_KEY,
    redirectUrl: process.env.EASYPAISA_REDIRECT_URL
};

module.exports = easypaisaConfig;
