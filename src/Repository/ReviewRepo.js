// services/ReviewDB.js

const ReviewModel = require("../model/ReviewModel.js");

const ReviewDB = async () => {
  try {
    const reviews = await ReviewModel.find(); // Fetch all reviews from the database
    return reviews; // Return the reviews data
  } catch (err) {
    console.error(err); // Log the error for debugging
    throw err; // Re-throw the error to be handled by the calling function
  }
};

const ReviewCreate = async (data) => {
  try {
    const review = await ReviewModel.create(data);
    return review;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
module.exports = { ReviewDB, ReviewCreate };
