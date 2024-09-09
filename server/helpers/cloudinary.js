const cloudinary = require('cloudinary').v2;
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
 

const storage = new multer.memoryStorage();

async function  uploadImageToCloudinary(file) {
    const result = await cloudinary.uploader.upload(file,
        {
            folder: 'shop-ease',
            use_filename: true,
            resource_type:'auto'
        }
    )

    return result.secure_url;
}

const upload = multer({storage:storage});

module.exports = { upload, uploadImageToCloudinary };

