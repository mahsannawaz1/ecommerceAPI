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

router.post('/order', express.raw({ type: 'application/json' }), async (req, res) => {

    const signature = req.header('stripe-signature')
    const payload = req.body
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
                product: cartItem.product,
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




