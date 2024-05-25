const auth = require('../middlewares/auth')
const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const { Product } = require('../models/Product')


const Joi  =require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const router = require('express').Router()

router.post('/',auth,async(req,res)=>{
    
    
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
    
    let order = new Order({
        customerId:req.user._id
    })
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

module.exports = router




