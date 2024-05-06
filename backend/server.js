require('dotenv').config()

const winston = require('winston')
const express = require('express')
const mongoose = require('mongoose')

winston.add(new winston.transports.Console())
const app = express()

mongoose.connect('mongodb://localhost/ecommerce')
.then(()=>winston.info('Connected to MongoDB'))
.catch(error=>winston.error(error.message,error))




const port = process.env.PORT || 3000
app.listen(port,()=>winston.info(`Listening at PORT: ${port}`))

