const mongoose = require('mongoose')
const sizes = require('../variables/sizes')

const orderItemSchema = mongoose.Schema({
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    product:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        size:{
            type:String,
            enum:sizes,
            required:true
        },

        color:{
            type:String,
            required:true
        }
    },
    unit_price:{
        type:Number,
        min:0
    },
    qty:{
        type:Number,
        min:0
    },

})
module.exports = mongoose.model('OrderItem',orderItemSchema)