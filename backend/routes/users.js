
const User = require('../models/User')
const Customer = require('../models/Customer')
const hashedPassword = require('../middlewares/hashPassword')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi  =require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const router = require('express').Router()

router.post('/register',async(req,res)=>{
    const { value,error } = validateUser(req.body)
    if(error){
        res.status(400).send({error:error.details[0].message})
        return
    }
    let user = await User.findOne({email:value.email})
    if(user){
        res.status(400).send({error:'User is already registered'})
        return
    }
    if(value.password != value.confirmPassword){
        res.status(400).send({error:`Passwords doesn't match`})
        return
    }
    const password = await hashedPassword(value.password)
    user = new User({
        email: value.email,
        password: password
    })
    user = await user.save()
    const customer = new Customer({
        firstName:value.firstName,
        lastName:value.lastName,
        userId:user._id
    })
    await customer.save()
    res.send(user)
})

router.post('/login',async(req,res)=>{
    const {value,error} = authenticateUser(req.body)
    const user = await User.findOne({email:value.email})
    if(!user){
        res.status(400).send({error:'Invalid Email or Password'})
        return
    }
    const validPassword = await bcrypt.compare(value.password,user.password)
    if(!validPassword){
        res.status(400).send({error:'Invalid Email or Password'})
        return
    }
    console.log(process.env.JWT_SECRET_KEY)
    const token = jwt.sign({ _id:user._id,isAdmin:user.isAdmin,isStaff:user.isStaff },process.env.JWT_SECRET_KEY)
    const customer = await Customer.findOne({userId:user._id})
    res.header('x-auth-token',token).send(customer)
})


const validateUser = (data) => {
    const schema = Joi.object({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required(),
        confirmPassword:Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const authenticateUser = (data) => {
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required(),
    })
    return schema.validate(data)
}

module.exports = router