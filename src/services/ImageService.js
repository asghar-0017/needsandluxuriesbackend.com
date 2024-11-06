const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'dwul2hfvj', 
    api_key: '725959839144441',
    api_secret: 'dPV-3z6Iv4pvNbmWJsAq3xUPr2A'
  });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowedFormats: ["jpg", "png", "gif"],
    public_id: (req, file) => `${file.fieldname}_${Date.now()}`, // Make sure to invoke Date.now()
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB size limit
});
module.exports={cloudinary,upload}