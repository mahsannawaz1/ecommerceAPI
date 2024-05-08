const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user_id:{
        type:String,
        unique:true
    }
})
module.exports = mongoose.model('Cart',cartSchema)