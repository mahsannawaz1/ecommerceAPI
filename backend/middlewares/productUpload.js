const multer = require('multer')

    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            return cb(null,'./uploads')
        },
        filename:(req,file,cb)=>{
            return cb(null,`${Date.now()}_${file.originalname}`)
        }
    })
    const upload  = multer({
        storage,
        limits: 1 * 1024 * 1024
    })
module.exports = upload