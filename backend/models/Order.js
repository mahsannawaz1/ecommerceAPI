const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    status:{
        type:String,
        enum:['Pending','In Progress','Completed','Cancelled'],
        default:'Pending'
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
    },
})
module.exports = mongoose.model('Order',orderSchema)