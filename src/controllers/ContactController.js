const SaveContact = require("../Repository/ContactRepo");
const Mail = require("../services/MailService");

const Contactus = async (req, res) => {
  try {
    const data = req.body;
    
    // Send mail and await the result
    const result = await Mail(data);
    
    if (result === true) {
      // Save contact if mail is successfully sent
      const contact = await SaveContact(data);
      res.status(200).json({ message: 'Contact information saved and email sent successfully.', contact });
    } else {
      res.status(500).json({ message: 'Failed to send email.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { Contactus };