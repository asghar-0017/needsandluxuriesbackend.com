const AddtoCartModel = require("../model/AddtoCartModel.js");
const { cloudinary,upload } = require("../services/ImageService.js");

const CreateCart = async (req, res) => {
  try {
    const productid = req.params.id;

    // Validate request data
    const data = req.body;
    data._id = productid;

    console.log("File details:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }


    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    console.log("Cloudinary Upload Result:", result);

    data.Imageurl = result.secure_url;

    // Validate and calculate discount if applicable
    const { price, sale, discountprice } = data;
    
    if (price && sale === 'true' && discountprice) {
      const discount = parseFloat(discountprice) / 100; 
      const newPrice = price - (price * discount); 
      data.newprice = newPrice;
    }

    console.log("Final Product Data:", data);
    
    // Create the cart item
    const review = await AddtoCartModel.create(data);
    
    res.status(200).json({ message: "Cart created successfully", review });
  } catch (err) {
    console.error("Error creating Cart:", err);
    res.status(500).json({ message: "Failed to create Cart", error: err.message });
  }
};

const GetFromCart = async(req,res)=>{
  try{
    const data = await AddtoCartModel.find()
    res.status(200).json({ message: "Product fetched successfully", data });
}
catch(err){
  console.error("Error fetching Product:", err);
}

}

const DeleteFromCart = async(req,res)=>{
  try{
    const id = req.params.id;
    const data = await AddtoCartModel.findByIdAndDelete(id)
    res.status(200).json({ message: "Product deleted successfully", data });

}
catch(err){
  console.error("Error deleting Product:", err);
}
}

const UpdateCart = async (req, res) => {
  try {
    const id = req.params.id;

    // Fetch the existing item
    const cartItem = await AddtoCartModel.findById(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Extract price and quantity
    const { price, Quantity } = cartItem;

    // Calculate total price
    const totalPrice = parseFloat(price) * parseInt(Quantity);

    // Update the price in the body of the request
    const updatedData = {
      ...req.body,
      newprice: totalPrice.toString(),
    };

    // Update the item in the database
    const updatedItem = await AddtoCartModel.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: "Product updated successfully", updatedItem });
  } catch (err) {
    console.error("Error updating Product:", err);
    res.status(500).json({ message: "Error updating Product", error: err.message });
  }
};
  
module.exports = { CreateCart,upload,GetFromCart, DeleteFromCart,UpdateCart };
