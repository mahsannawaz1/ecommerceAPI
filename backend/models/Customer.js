const mongoose  = require('mongoose')
const cities = require('../variables/cities')

const customerSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    phone:{
        type:String,
        length:10,
    },
    shippingAddress:{
        type: {
            city:{
                type:String,
            },
            area:{
                type:String,
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
})

module.exports = mongoose.model('Customer',customerSchema)
