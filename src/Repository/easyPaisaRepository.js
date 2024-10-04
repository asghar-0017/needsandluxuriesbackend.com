const { getRepository } = require('typeorm');
const Payment = require('../entities/Payment');

exports.savePaymentRecord = async (transactionId, orderId, amount, status) => {
    const paymentRepository = getRepository(Payment);
    const newPayment = paymentRepository.create({
        transactionId,
        orderId,
        amount,
        status
    });

    await paymentRepository.save(newPayment);
    return newPayment;
};
