const cloudinary = require('cloudinary')
const { CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'innovarte',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, res, cb) {
        cb(null, res.originalname)
    }
})

const uploader = multer({ storage })
module.exports = uploader