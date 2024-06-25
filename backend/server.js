require('dotenv').config()
require('express-async-errors')

const { products } = require('./routes/products')
const categories = require('./routes/categories')
const carts = require('./routes/carts')
const orders = require('./routes/orders')
const users = require('./routes/users')
const error = require('./middlewares/error')
const morgan = require('morgan')
const winston = require('winston')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
require('./routes/socialMediaAuth')



winston.add(new winston.transports.Console())

const app = express()
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(morgan('dev'))


mongoose.connect('mongodb://localhost/ecommerce')
.then(()=>winston.info('Connected to MongoDB'))
.catch(error=>winston.error(error.message,error))

app.use(session({
    secret:process.env.APP_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors())
app.use('/api/products',products)
app.use('/api/categories',categories)
app.use('/api/cart',carts)
app.use('/api/checkout',orders)
app.use('/api',users)

app.use(error)

const port = process.env.PORT || 3000
app.listen(port,()=>winston.info(`Listening at PORT: ${port}`))

