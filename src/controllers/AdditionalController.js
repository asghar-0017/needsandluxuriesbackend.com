const AdditionalModel = require("../model/AdditionalModel")
const { AdditionalDB, AdditionalCreate } = require("../Repository/AdditionalRepo.js");
const CreateAdditional = async (req, res) => {
    try {
      const data = req.body;
      const productid = req.params.id;
  
  
      data.productId = productid; // Assign product ID from the URL parameter
  
      // Proceed to create review
      const review = await AdditionalCreate(data);
  
      res.status(200).json({ message: "Additional-Info created successfully", review });
    } catch (err) {
      console.error("Error creating review:", err);
      res.status(500).json({ message: "Failed to create Additional-Info", error: err.message });
    }
  };
  
  const GetSingleAdditional = async (req, res) => {
    try {
      const data = await AdditionalModel.find({ productId: req.params.id }); // Use findOne to fetch based on productId
  
      if (!data) {
        return res.status(404).json({ message: "Additional-Info not found" });
      }
  
      res.status(200).json({ message: "Additional-Info fetched successfully", data });
    } catch (err) {
      console.error("Error fetching Additional-Info:", err);
      res.status(500).json({ message: "Error fetching Additional-Info", error: err.message });
    }
  };
  
  
  const ShowAdditional = async (req, res) => {
    try {
      const data = await AdditionalDB(); // Await the result of ReviewDB
      res.status(200).json({ message: "Review fetched successfully", data });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res
        .status(500)
        .json({ message: "Failed to fetch reviews", error: err.message }); // Send a proper error response
    }
  };
  
  module.exports = { CreateAdditional, ShowAdditional, GetSingleAdditional };