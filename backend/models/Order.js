const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user_id:{
        type:String,
        unique:true
    },
    qty: Number,
    status:{
        type:String,
        enum:['Pending','In Progress','Completed','Cancelled'],
        default:'Pending'
    },
    shippingAddress:{
        type: {
            city:String,
            country:String,
            address:String
        }
    },
    contact:{
        type:{
            email:String,
        }
    },
})
module.exports = mongoose.model('Order',orderSchema)