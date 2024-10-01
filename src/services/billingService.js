const dataInRepo=require('../Repository/billingRepository')
const billingDetailMail=require('../mediater/billingDetail')

const sendDataInService=async(data)=>{
    try{
        const sendEmail=await billingDetailMail(data)
        if(sendEmail){

            const result=await dataInRepo(data)
            return result
        }
        
       
    }catch(error){
        throw error
    }
}

module.exports=sendDataInService