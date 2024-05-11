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
    email:{
            type:String,
            required:true
    },
    phone:{
        type:String,
        minlength:11,
        maxlength:11,
        required:true
    },
    shippingAddress:{
        type: {
            city:{
                type:String,
                enum: cities
            },
            country:String,
            address:String
        }
    },
})

module.exports = mongoose.model('Customer',customerSchema)
