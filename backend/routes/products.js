const { Product } = require('../models/Product')
const Manufacturer = require('../models/Manufacturer')
const upload = require('../middlewares/productUpload')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const fs = require('fs')
const _ = require('lodash')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const router = require('express').Router()

router.get('/',async(req,res)=>{
    
    if(req.query.type){
        res.send(await Product.find({category:req.query.category,type:req.query.type}).populate({path:'manufacturer',select:'-_id'}).populate({path:'category',select:'-_id'}).sort(`${req.query.sort_by}`))  
        return
    }
    res.send(await Product.find({category:req.query.category}).populate({path:'manufacturer',select:'-_id'}).populate({path:'category',select:'-_id'}).sort(`${req.query.sort_by}`))  
})
router.get('/:id',async(req,res)=>{
    const product = await Product.findById(req.params.id).populate({path:'category',select:'-_id'}).select('-manufacturer')
    if(!product){
        res.status(400).send({error:'Product ID not found'})
        return;
    }
    res.send(product)  
})

router.post('/',[auth,admin,upload.array('images')],async (req,res)=>{
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
        fit:product.fit,
        manufacturer:product.manufacturer,
        category:product.category,
        sizeColorNames:product.sizeColorNames,
        type:product.type,
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
        fit:Joi.string().valid('regular','relaxed','slim','loose').required(),
        type:Joi.string().valid('t-shirts','polos','shirts','trousers','jeans','activewear').required(),
        sizeColorNames:Joi.array().unique('name').min(1).items(
            Joi.object(
                {
                    name:Joi.string().valid('6-12M','12-18M','18-24M','2-3Y','3-4Y','4-5Y','5-6Y','6-7Y','7-8Y','8-9Y','9-10Y','10-11Y','11-12Y','13-14Y','XS','S','M','L','XL','2XL').required(),
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
