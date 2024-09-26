// services/ReviewDB.js

const AdditionalModel = require("../model/AdditionalModel")

const AdditionalDB = async () => {
  try {
    const reviews = await AdditionalModel.find(); // Fetch all reviews from the database
    return reviews; // Return the reviews data
  } catch (err) {
    console.error(err); // Log the error for debugging
    throw err; // Re-throw the error to be handled by the calling function
  }
};

const AdditionalCreate = async (data) => {
  try {
    const review = await AdditionalModel.create(data);
    return review;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
module.exports = { AdditionalDB, AdditionalCreate };
