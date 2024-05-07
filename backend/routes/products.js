const { Product } = require('../models/Product')
const Category = require('../models/Category')
const Manufacturer = require('../models/Manufacturer')

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
    if(req.files && req.files.length<1){   
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
    let qtyinStock = 0
    _.forEach(product.sizeColorNames,(size)=>{
        qtyinStock += _.reduce(size.colors,(total,color) => total + color.qty,0)
    })
    const prod = new Product({
        sku:product.sku,
        name:product.name,
        description:product.description,
        price:product.price,
        qtyInStock:qtyinStock,
        manufacturer:product.manufacturer,
        category:product.category,
        sizeColorNames:product.sizeColorNames,
        images:images
    })

    res.send(await prod.save())
})

const validateProduct = (data)=>{
    const schema = Joi.object({
        sku:Joi.string().min(5).max(10).required(),
        name:Joi.string().min(5).max(255).required(),
        description:Joi.string().required(),
        manufacturer:Joi.objectId().required(),
        category:Joi.objectId().required(),
        price:Joi.number().min(0).required(),
        sizeColorNames:Joi.array().unique('name').min(1).items(
            Joi.object(
                {
                    name:Joi.string().valid('6-7Y','7-8Y','8-9Y','9-10Y','10-11Y','11-12Y','13-14Y','XS','S','M','L','XL','2XL').required(),
                    colors:Joi.array().unique('name').min(1).items(
                        Joi.object(
                            {
                                name:Joi.string().required(),
                                qty:Joi.number().min(0).required()
                            }
                        ))
                    
                }
            )).required()

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
