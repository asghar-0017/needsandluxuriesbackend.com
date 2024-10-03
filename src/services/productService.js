const updateDataInRepo=require('../Repository/productRepository')

const productUpdatedData=async(productId,updateData)=>{
    try{
        const data=await updateDataInRepo(productId,updateData)
        return data
    }catch(error){
        throw error
    }

}   

module.exports=productUpdatedData