const mongoose = require('mongoose')

const paymentMethodSchema = mongoose.Schema({
    paymentType:{
        type:String,
        enum:['COD','Card']
    },
    cardDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CardDetail'
    }
})
module.exports = mongoose.model('Payment',paymentMethodSchema)