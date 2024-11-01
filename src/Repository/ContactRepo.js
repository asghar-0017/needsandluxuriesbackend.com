const ContactModel = require("../model/ContactModel.js");

const SaveContact = async (data) => {
  try {
    const contact = await ContactModel.create(data);
    return contact; 
  } catch (err) {
    console.error('Error saving contact data:', err);
    throw new Error('Error saving contact data'); 
  }
};

module.exports = SaveContact;
