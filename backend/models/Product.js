const mongoose = require('mongoose')
const { categorySchema } = require('./Category')

const productSchema = new mongoose.Schema({
    sku: {
        type:String,
        minlength:5,
        maxlength:10,
        trim:true,
        required:true,
        
    },
    name: {
        type:String,
        maxlength:255,
        trim:true,
        required:true,
        
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        min:0,
        required:true
    },
    qtyInStock: {
        type:Number,
        min:0,
        required:true
    },
    images: {
        type: [String],
        validate:{
            validator: (value)=> value.length > 0,
            message: 'Images cannot be empty'
        }
    },
    category: {
        type: [categorySchema],
        validate:{
            validator: (value)=> value.length > 0,
            message: 'Category cannot be empty'
        }
    },
    sizes: {
        type: [ 
            {
                name: {
                type:String,
                enum:['S','M','L','XL'],
                required:true
                },
                qty: {
                type:Number,
                min:0,
                required:true
                }
            }   
        ],
        validate:{
            validator: (value)=> value.length > 0,
            message: 'Sizes cannot be empty'
        }
    }
})

module.exports = mongoose.model('Product',productSchema)

