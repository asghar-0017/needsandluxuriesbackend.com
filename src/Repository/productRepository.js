const ProductModel = require('../model/ProductModel');

const updateDataInRepo = async (productId, updateData) => {
    try {
      const previousProduct = await ProductModel.findById(productId);
  
      if (!previousProduct) {
        throw new Error("Product not found");
      }
  
      let updateFields = { ...updateData };
  
      if (previousProduct.sale === true && updateData.sale === 'false') {
        await ProductModel.findByIdAndUpdate(productId, { $unset: { discountprice: "", newprice: "" } });
      }
        const result = await ProductModel.findByIdAndUpdate(productId, updateFields, { new: true });
  
      if (result) {
        return result;
      } else {
        return ("Product not found");
      }
    } catch (error) {
      throw error;
    }
  };

module.exports = updateDataInRepo;
