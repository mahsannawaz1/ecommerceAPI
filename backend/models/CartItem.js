const mongoose = require('mongoose')

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
        size:{
            type:String,
            enum:['6-12M','12-18M','18-24M','2-3Y','3-4Y','4-5Y','5-6Y','6-7Y','7-8Y','8-9Y','9-10Y','10-11Y','11-12Y','13-14Y','XS','S','M','L','XL','2XL'],
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
module.exports = mongoose.model('CartItem',cartItemSchema)