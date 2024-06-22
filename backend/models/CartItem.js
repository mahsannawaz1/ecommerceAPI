const mongoose = require('mongoose')
const sizes = require('../variables/sizes')

const cartItemSchema = mongoose.Schema({
    cart_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    product:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        sku:{
            type:String,
            required:true
        },
        name:{
            type:String,
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
        },
        image:{
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
module.exports = mongoose.model('CartItem',cartItemSchema)