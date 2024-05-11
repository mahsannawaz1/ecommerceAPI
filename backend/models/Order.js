const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    
    status:{
        type:String,
        enum:['Pending','In Progress','Completed','Cancelled'],
        default:'Pending'
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        unique:false
    },
})
module.exports = mongoose.model('Order',orderSchema)