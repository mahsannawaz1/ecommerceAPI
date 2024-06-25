
const User = require('../models/User')
const Customer = require('../models/Customer')
const hashedPassword = require('../middlewares/hashPassword')

const passport = require('passport')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi  =require('joi')
const sendEmail = require('../middlewares/sendEmail')
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
        res.status(400).send({error:'User is already registered.'})
        return
    }
    if(value.password != value.confirmPassword){
        res.status(400).send({error:`Passwords don't match.`})
        return
    }
    const password = await hashedPassword(value.password)
    user = new User({
        email: value.email,
        password: password,
    })
    user = await user.save()
    const customer = new Customer({
        firstName:value.firstName,
        lastName:value.lastName,
        userId:user._id
    })
    await customer.save()
    sendEmail(user.email,'VERIFY',user._id)
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
    if(!user.isVerified){
        sendEmail(user.email,'VERIFY',user._id)
        res.status(400).send({error:'Your email is not Verified.We have sent a verification email to your email address.'})
        return
    }
    console.log(process.env.JWT_SECRET_KEY)
    const token = jwt.sign({ _id:user._id,isAdmin:user.isAdmin,isStaff:user.isStaff },process.env.JWT_SECRET_KEY)
    const customer = await Customer.findOne({userId:user._id})
    res.header('x-auth-token',token).send(customer)
})

router.post('/verifyEmail',async(req,res)=>{
    
    const token = req.body.token
    if(!token){
        res.status(400).send({error:'No Token provided!'})
        return
    }
    const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
    if(!user){
        res.status(400).send({error:'Invalid Token!'})
        return
    }
    user.isVerified= true
    user.verifyToken = null
    user.verifyTokenExpiry = null
    await user.save()
    res.send('Email Verified Successfully')

})
router.post('/sendResetEmail',async(req,res)=>{
    const email = req.body.email
    if(!email){
        res.status(400).send({error:'No Email provided!'})
        return
    }
    const user = await User.findOne({email})
    if(!user){
        res.status(400).send({error:'Invalid Email address entered.'})
        return
    }
    sendEmail(user.email,'RESET',user._id)
    res.send(user)
})
router.post('/changePassword',async(req,res)=>{
    const { password,confirmPassword,token } = req.body
    
    if(!token){
        res.status(400).send({error:'No Token provided!'})
        return
    }
    
    if(password!==confirmPassword){
        res.status(400).send({error:'Passwords do not match.'})
        return
    }
    
    const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})
    if(!user){
        
        res.status(400).send({error:'Invalid Token!'})
        return
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(validPassword){
        res.status(400).send({error:'New Password must be different from the previous one.'})
        return
    }
    const hashedPass = await hashedPassword(password)
    user.password = hashedPass
    user.forgotPasswordToken = null
    user.forgotPasswordTokenExpiry = null
    await user.save()
    
    res.send('Reset Password Successfully')
    return
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/signin' }),
    (req, res) => {
        console.log('google')
        console.log('User',req.user)
        if(!req.user.isVerified){
            sendEmail(req.user.email,'VERIFY',req.user._id)
            res.redirect(`http://localhost:5173/user/verify?email=${req.user.email}`);
        }
        res.redirect('http://localhost:5173');
        
    }
);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        // res.redirect('http://localhost:5173/user/verify');
    }
);



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