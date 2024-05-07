const mongoose = require('mongoose')

const manufacturerSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:255,
        required:true,
        trim:true
    },
    location: {
        type:String,
        trim:true
    },
    contactInfo: {
        phone: { 
            type:String,
            required:true
        },
        email: {
            type:String,
            required:true
        }
    }
})
module.exports = mongoose.model('Manufacturer',manufacturerSchema)