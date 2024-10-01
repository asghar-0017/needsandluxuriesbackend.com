const sendDataInService = require("../services/billingService");

const billingDetail = async (req, res) => {
  try {
    const data = req.body;    
      const result = await sendDataInService(data);
      res.status(200).json({ message: 'email sent successfully.', result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server error.' });
  }
};

module.exports = { billingDetail };
