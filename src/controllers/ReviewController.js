const ReviewModel = require("../model/ReviewModel.js");
const { ReviewDB, ReviewCreate } = require("../Repository/ReviewRepo.js");
const CreateReview = async (req, res) => {
  try {
    const data = req.body;
    const productid = req.params.id;


    data.productId = productid; // Assign product ID from the URL parameter

    // Proceed to create review
    const review = await ReviewCreate(data);

    res.status(200).json({ message: "Review created successfully", review });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Failed to create review", error: err.message });
  }
};


const ShowReview = async (req, res) => {
  try {
    const data = await ReviewDB(); // Await the result of ReviewDB
    res.status(200).json({ message: "Review fetched successfully", data });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to fetch reviews", error: err.message }); // Send a proper error response
  }
};

module.exports = { CreateReview, ShowReview };
