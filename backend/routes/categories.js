const Category = require('../models/Category')

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const router = require('express').Router()

router.get('/',async(req,res)=>{
    res.send(await Category.find())
})

module.exports = router