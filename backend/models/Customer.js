const mongoose  = require('mongoose')
const cities = require('../variables/cities')

const customerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        minlength:11,
        maxlength:11,
    },
    shippingAddress:{
        type: {
            city:{
                type:String,
                enum: cities
            },
            country:{
                type:String,
            },
            address:{
                type:String,
            },
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true
    },
    isCustomer:{
        type:Boolean,
        default:true
    },
})

module.exports = mongoose.model('Customer',customerSchema)
