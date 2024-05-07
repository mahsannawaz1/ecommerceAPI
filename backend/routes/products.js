const {Product} = require('../models/Product')


const fs = require('fs')
const _ = require('lodash')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const multer = require('multer')

const router = require('express').Router()


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

router.post('/',upload.array('images'),async (req,res)=>{
    
    if(req.files.length<1){   
        res.status(400).send({error:'Images cannot be empty'})
        return
    }
    const images = _.map(req.files,(file)=>`http://localhost:3000/uploads/${file.filename}`)
    let { value:product, error:productError } = validateProduct(req.body)
    if(productError){
        deleteFiles(req.files)
        res.status(400).send({ error:productError.details[0].message })
        return
    }
    
    const qtyinStock = _.reduce(product.sizes,(total,size)=>total+size.qty,0)
    const prod = new Product({
        sku:product.sku,
        name:product.name,
        description:product.description,
        price:product.price,
        qtyInStock:qtyinStock,
        sizes:product.sizes,
        images:images
    })
    res.send(await prod.save())
    res.send(images)
})

const validateProduct = (data)=>{
    const schema = Joi.object({
        sku:Joi.string().min(5).max(10).required(),
        name:Joi.string().min(5).max(255).required(),
        description:Joi.string().required(),
        price:Joi.number().min(0).required(),
        sizes:Joi.array().min(1).items(Joi.object(
            {
                name:Joi.string().valid('S','M','L','XL').required(),
                qty:Joi.number().min(0).required()
            })).required()

    })
    return schema.validate(data)
}

const deleteFiles = (files) => {
    _.forEach(files,(file)=>{
        fs.unlink(file.path,(error)=>{
            if(error){
                console.log('Error while deleting files')
                return;
            }
        })
    })
}
module.exports.deleteFiles = deleteFiles

module.exports.products = router
