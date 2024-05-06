const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:255,
        required:true,
        trim:true
    }
})
module.exports = mongoose.model('Category',categorySchema)