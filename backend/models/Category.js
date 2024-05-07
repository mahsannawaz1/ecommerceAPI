const mongoose = require('mongoose')
const { productSchema } = require('./Product')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:255,
        required:true,
        trim:true
    }
    ,
    products:{
        type:[productSchema]
    }
})
module.exports = mongoose.model('Category',categorySchema)