const ReviewModel = require("../model/ReviewModel.js");
const { ReviewDB, ReviewCreate } = require("../Repository/ReviewRepo.js");
const CreateReview = async (req, res) => {
  try {
    const data = req.body;
    const productid = req.params.id;
    data.productId = productid; 
    const review = await ReviewCreate(data);
    res.status(200).json({ message: "Review created successfully", review });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Failed to create review", error: err.message });
  }
};

const GetSingleReview = async (req, res) => {
  try {
    const data = await ReviewModel.find({ productId: req.params.id }); 
    if (!data) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review fetched successfully", data });
  } catch (err) {
    console.error("Error fetching review:", err);
    res.status(500).json({ message: "Error fetching review", error: err.message });
  }
};


const ShowReview = async (req, res) => {
  try {
    const data = await ReviewDB();
    res.status(200).json({ message: "Review fetched successfully", data });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch reviews", error: err.message }); 
  }
};

module.exports = { CreateReview, ShowReview, GetSingleReview };
