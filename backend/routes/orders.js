const auth = require('../middlewares/auth')
const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const { Product } = require('../models/Product')
const _ = require('lodash')
const bodyParser = require('body-parser')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const Customer = require('../models/Customer')
const router = require('express').Router()

router.post('/', express.json({verify: (req,res,buf) => { req.rawBody = buf }}), async (req, res) => {

    const signature = req.header('stripe-signature')
    const payload = req.rawBody
    let event
    try {
        event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_ENDPOINT_SECRET)
        console.log('Webhook verified')
    } catch (error) {
        console.log('Webhook error', error.message)
        res.status(400).send('Webhook error: ')
        return
    }
    if (event.type == 'checkout.session.completed') {
        const session = event.data.object
        const { cart_id, user_id } = session.metadata
        const cart = await Cart.findById(cart_id)
        console.log('cart_id: ', cart)

        if (!cart) {
            res.status(400).send({ error: 'Cart ID not found' })
            return
        }
        const cartItems = await CartItem.find({ cart_id: cart._id })

        if (!cartItems) {
            req.status(400).send({ error: 'Cart is Empty' })
            return
        }
        const customer = await Customer.findOne({ userId: user_id })
        let order = new Order({
            customerId: customer._id
        })
        order = await order.save()
        const productIDs = []
        cartItems.forEach(async (cartItem) => {
            let orderItem = new OrderItem({
                order_id: order._id,
                product: {
                    id:cartItem.product.id,
                    name:cartItem.product.name,
                    color:cartItem.product.color,
                    size:cartItem.product.size,
                    image:cartItem.product.image,
                    price:cartItem.unit_price,
                    sku:cartItem.product.sku
                },
                qty: cartItem.qty
            })
            productIDs.push(cartItem.product.id)
            await orderItem.save()
        })

        const products = await Product.find({ _id: { $in: productIDs } })

        await updateStock(cartItems, products)
        await CartItem.deleteMany({ cart_id: cart.id })
        console.log(order)
        res.send(order)
    }



})

router.get('/',auth,async(req,res)=>{

    const { limit } = req.query
    console.log('Limit:',limit)
    const take = limit ? parseInt(limit) : null
    const customer = await Customer.findOne({userId:req.user._id})
    let orders = await Order.find({customerId:customer._id})
    if(take)
        orders = await Order.find({customerId:customer._id}).limit(take)
    const populatedOrders = await Promise.all(orders.map(async (order) => {
        // Find orderItems for the current order
        const orderItems = await OrderItem.find({ order_id: order._id });

        return {
            orderId: order._id,
            status: order.status,
            customerId: order.customerId,
            orderItems
        };
    }));

    res.send(populatedOrders);

})

async function updateStock(cartItems, products) {
    for (const item of cartItems) {
        for (const product of products) {
            for (const sizeColorName of product.sizeColorNames) {
                const color = sizeColorName.colors.find(color => color.name === item.product.color && sizeColorName.name === item.product.size);
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




