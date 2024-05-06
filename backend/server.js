require('dotenv').config()

const winston = require('winston')
const express = require('express')
const mongoose = require('mongoose')

winston.add(new winston.transports.Console())
const app = express()

const port = process.env.PORT || 3000
app.listen(port,()=>winston.info(`Listening at PORT: ${port}`))

