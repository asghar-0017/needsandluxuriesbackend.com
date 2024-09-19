const ReviewModel = require("../model/ReviewModel.js")

const CreateReview = async(req,res)=>{

    try{
        const data = req.body
        const review = await ReviewModel.create(data)
        res.status(200).json({message:"review created successfully",review})
    }

    catch(err){
        console.log(err)
    }
}

const ShowReview = async(req,res)=>{
    try{
        const review = await ReviewModel.find()
        res.status(200).json({review})
    }

    catch(err){
        console.log(err)
    }
}

module.exports = {CreateReview,ShowReview}