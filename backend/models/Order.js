const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user_id:{
        type:String,
        unique:true
    },
    cart_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    qty:{
        type:Number
    }
})
module.exports = mongoose.model('Order',orderSchema)