const ProductModel = require("../model/ProductModel.js");
const { cloudinary, upload } = require("../services/ImageService.js");
const productUpdatedData=require('../services/productService.js')


const CreateProduct = async (req, res) => {
  try {
    const data = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    if (typeof data.materials === 'string') {
      data.materials = data.materials.split(',').map((material) => material.trim());
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Result",result)
    data.Imageurl = result.secure_url;
    const { price, sale, discountprice } = data;
    if (sale === 'true' && discountprice) {
      const discount = parseFloat(discountprice) / 100; 
      const newPrice = price - (price * discount); 
      data.newprice = newPrice;
    }
    const response = await ProductModel.create(data);
    res.status(201).json({ message: "Product created successfully", response });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

const GetProduct = async (req, res) => {
  try {
    const data = await ProductModel.find();
    res.status(200).json({ message: "Products fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

const GetProductCollection = async (req, res) => {
  try {
    const collections = await ProductModel.distinct("collection");
    res.status(200).json({ message: "Collections fetched successfully", collections });
  } catch (error) {
    res.status(500).json({ message: "Error fetching collections", error: error.message });
  }
};



const GetOneProduct = async (req, res) => {
  try {
    const data = await ProductModel.findById(req.params.id);
    res.status(200).json({ message: "Product fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};
const productUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    let updateData = { ...req.body };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.Imageurl = result.secure_url;
    }
    const { price, sale, discountprice } = updateData;
    if (sale === 'false') {
      delete updateData.discountprice;
      delete updateData.newprice;
    } else if (sale === 'true' && discountprice) {
      const discount = parseFloat(discountprice) / 100;
      const newPrice = price - (price * discount);
      updateData.newprice = newPrice; 
    }
    const result = await productUpdatedData(id, updateData);
    if (result) {
      res.status(200).json({ message: "Product updated successfully", result });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ProductModel.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = { CreateProduct, upload, GetProduct, GetOneProduct, productUpdate, 
  deleteProduct,GetProductCollection  };
