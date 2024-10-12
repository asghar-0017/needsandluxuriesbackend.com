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
                message: 'Error adding stretch data',
                error: error.message,
            });
        }
    },
}

module.exports=stratchData