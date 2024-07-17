const auth = require('../middlewares/auth')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = require('express').Router()



router.post('/', auth, async (req, res) => {
    // Extract items from request body
    const items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: 'pkr',
                unit_amount: item.unit_price * 100,
                product_data: {
                    name: item.product.name,
                    images: [item.product.image],
                    description: item.product.description
                }
            },
            quantity: item.qty
        };
    });

    try {
        // Create a new customer in Stripe
        const customer = await stripe.customers.create({
            email: req.user.email,
            name: req.user.name
        });

        // Create a checkout session with the created customer ID
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:5173',
            cancel_url: 'http://localhost:5173',
            line_items: items,
            customer: customer.id, // Add the customer ID here
            metadata: {
                cart_id: req.body.cartItems[0].cart_id,
                user_id: req.user._id
            }
        });

        // Send the session URL as the response
        res.send({ url: session.url });
    } catch (error) {
        console.error('Error creating Stripe session: ', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router
