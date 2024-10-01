const dataInRepo=require('../Repository/billingRepository')
const billingDetailMail=require('../mediater/billingDetail')

const sendDataInService=async(data)=>{
    try{
        const result=await dataInRepo(data)
        if(result){
            await billingDetailMail(data)
        }
        return result
    }catch(error){
        throw error
    }
}

module.exports=sendDataInService