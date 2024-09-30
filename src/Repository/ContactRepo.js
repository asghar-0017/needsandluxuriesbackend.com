const ContactModel = require("../model/ContactModel.js");

const SaveContact = async (data) => {
  try {
    // Save the contact data in the database
    const contact = await ContactModel.create(data);
    return contact; // return the contact information
  } catch (err) {
    console.error('Error saving contact data:', err);
    throw new Error('Error saving contact data'); // throw the error to be caught in the controller
  }
};

module.exports = SaveContact;
