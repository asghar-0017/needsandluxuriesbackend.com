const StretchModel=require('../model/stratchModel')
const { cloudinary,upload } = require('../services/ImageService'); 


const stratchData={

    addStratchData: async (req, res) => {
        try {
            const data = req.body;
            console.log("data",data)
            if (req.file) {
                const resultData = await cloudinary.uploader.upload(req.file.path);
                data.image = resultData.secure_url;     
                   }
            const stretchData = new StretchModel(data);
            await stretchData.save();
            res.status(201).json({
                message: 'Stretch data added successfully!',
                data: stretchData,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Interbal Server Error',
                error: error.message,
            });
        }
    },
    getStatchData:async(req,res)=>{
        try{
            const data= await StretchModel.find()
            res.status(201).json({
                message: 'Stretch data added successfully!',
                data: data,
            });

        }catch(error){
            console.error(error);
            res.status(500).json({
                message: 'Interbal Server Error',
                error: error.message,
            });
        }
    },
    getStatchDataById:async(req,res)=>{
        const id=req.params.id
        console.log(id)
        try{
            const data = await StretchModel.findById(id);

    if (!data) {
        return res.status(404).json({
            message: 'Stretch data not found.',
        });
    }

    res.status(200).json({
        message: 'Stretch data retrieved successfully!',
        data: data,
    });

        }catch(error){
            console.error(error);
            res.status(500).json({
                message: 'Interbal Server Error',
                error: error.message,
            });
        }
    }
}

module.exports=stratchData