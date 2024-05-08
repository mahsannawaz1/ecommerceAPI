const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const { Product } = require('../models/Product')

const Joi  =require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const router = require('express').Router()

router.post('/',async(req,res)=>{
    
    
    const { value,error } = validateCartItem(req.body)
    if(error){
        res.status(400).send({error:error.details[0].message})
        return
    }
    const cart = await Cart.findById(value.cart_id)
    
    if(!cart){
        res.status(400).send({error:'Cart ID not found'})
        return
    }
    const product = await Product.findById(value.product.id)
    let qty = 0
    for(size of product.sizeColorNames){
        if( size.name == value.product.size ){
            const colorInfo = size.colors.find(color=>color.name==value.product.color)
            if(colorInfo)
                qty = colorInfo.qty
            break
        }
    }
    if(qty<value.qty){
        res.status(400).send({error:'Out Of Stock'})
        return
    }
    let cartItem = await CartItem.findOne({'product.id':value.product.id, cart_id: cart._id,'product.size':value.product.size })
    if(cartItem){
        cartItem.qty = value.qty
        res.send(await cartItem.save())
        return
    }
    
    cartItem = new CartItem({
        cart_id: value.cart_id,
        product: value.product,
        qty: value.qty,
        unit_price: value.unit_price
    })
    
    res.send(await cartItem.save())
})

const validateCartItem = (data)=>{
    const schema  =Joi.object({
        cart_id:Joi.objectId().required(),
        product:Joi.object({
            id:Joi.objectId().required(),
            size:Joi.string().required(),
            color:Joi.string().required()
        }),
        qty:Joi.number().min(0).required(),
        unit_price:Joi.number().min(0).required()
    })
    return schema.validate(data)
}

module.exports = router




