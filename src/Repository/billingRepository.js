const billingDetail = require('../model/billingDetail');

const dataInRepo = async (data) => {
  try {
    const result = await billingDetail.create(data);
    return result;
  } catch (err) {
    console.error('Error saving Billing Detail:', err);
    throw new Error('Error saving Billing Detail');
  }
}

module.exports = dataInRepo;
