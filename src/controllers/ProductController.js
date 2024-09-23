const ProductModel = require("../model/ProductModel.js")
const {cloudinary,upload} = require("../services/ImageService.js")

// Product creation controller
const CreateProduct = async (req, res) => {
  try {
    const data = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    console.log("File details:", req.file);

    const result = await cloudinary.uploader.upload(req.file.path);

    console.log("Cloudinary Upload Result:", result);

    data.Imageurl = result.secure_url;

    const { price,sale,discountprice } = data;

    if (sale === 'true' && discountprice) {
        const discount = parseFloat(discountprice) / 100; 
        const newPrice = price - (price * discount); 
        data.price = newPrice;
      }

    // const totalPrice = parseFloat(price) * parseInt(Quantity);
    // data.price = totalPrice.toString();

    console.log("Final Product Data:", data);

    const response = await ProductModel.create(data);

    res.status(201).json({ message: "Product created successfully", response });
  } catch (error) {
    console.error("Error creating product:", error);

    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

const GetProduct = async (req,res)=>{

  try {

    const data = await ProductModel.find();

    res.status(200).json({ message: "Product fetched successfully", data });

  } catch (error) {

    res.status(500).json({ message: "Error fetching product", error: error.message });

  }

}
const GetOneProduct = async(req,res)=>{

  try {

    const data = await ProductModel.findById(req.params.id);

    res.status(200).json({ message: "Product fetched successfully", data });

  } catch (error) {

    res.status(500).json({ message: "Error fetching product", error: error.message });

  }

}

module.exports = { CreateProduct, upload,GetProduct,GetOneProduct };
