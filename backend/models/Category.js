const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:255,
        required:true,
        trum:true
    }
})
module.exports.categorySchema = categorySchema
module.exports.Category = mongoose.model('Category',categorySchema)