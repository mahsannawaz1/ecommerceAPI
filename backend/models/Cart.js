const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true
    }
})
module.exports = mongoose.model('Cart',cartSchema)