const mongoose  = require('mongoose')
const cities = require('../variables/cities')

const customerSchema = new mongoose.Schema({

    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isStaff:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Customer',customerSchema)
