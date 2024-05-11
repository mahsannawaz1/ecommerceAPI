const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const { Product } = require('../models/Product')
const cities = require('../variables/cities')

const Joi  =require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const router = require('express').Router()

router.post('/',async(req,res)=>{
    
    
    const cart = await Cart.findById(req.body.cart_id)
    
    if(!cart){
        res.status(400).send({error:'Cart ID not found'})
        return
    }
    const cartItems = await CartItem.find({ cart_id:cart._id })

    if(!cartItems){
        req.status(400).send({error:'Cart is Empty'})
        return
    }
    
    let order = new Order()
    order = await order.save()
    const productIDs=[]
    cartItems.forEach( async(cartItem)=>{
        let orderItem = new OrderItem({
            order_id:order._id,
            product:cartItem.product,
            qty:cartItem.qty
        })
        productIDs.push(cartItem.product.id)
        await orderItem.save()
    } )

    const products = await Product.find( { _id: {$in:productIDs } } )

    await updateStock(cartItems,products)
    await CartItem.deleteMany({cart_id:cart.id})
    
    res.send(order)
})

// router.put('/shipping',async (res,res)=>{
//     console.log(req.body)
// })


async function updateStock(cartItems, products) {
    for (const item of cartItems) {
        for (const product of products) {
            for (const sizeColorName of product.sizeColorNames) {
                const color = sizeColorName.colors.find( color => color.name === item.product.color && sizeColorName.name === item.product.size );
                if (color) {
                    color.qty -= item.qty;
                    product.qtyInStock -= item.qty;
                    await product.save(); 
                }
            }
        }
    }
}
const validateShippingInfo = (data)=>{
    const schema = Joi.object({
        order_id:Joi.objectId().required(),
        customer:Joi.object({
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            email:Joi.string().email(),
            phone:Joi.string().min(11).max(11),
            shippingAddress:Joi.object({
                city:Joi.string().valid(cities).required(),
                country:Joi.string().required(),
                address:Joi.string().required()
            })
        }),
        
    })
    return schema.validate(data)
}
module.exports = router




