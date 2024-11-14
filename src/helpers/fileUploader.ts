import multer from "multer"
import path, { resolve } from "path"
import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

cloudinary.config({
    cloud_name: 'dsolupxw1',
    api_key: '845715583541723',
    api_secret: 'LfMvgtCedRAc_DPxpCZq1Kb4ON4'
});


const uploadToCloudinary = async (file: any) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload(
                file.path, { public_id: file.originalname },
                (error, result) => {
                    fs.unlinkSync(file.path)
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                }
            )
    })
}

export const fileUploader = {
    upload,
    uploadToCloudinary
}