const mongoose = require('mongoose')
const sizes = require('../variables/sizes')


const productSchema = new mongoose.Schema({
    sku: {
        type:String,
        minlength:5,
        maxlength:10,
        trim:true,
        required:true,
        unique:true
        
    },
    name: {
        type:String,
        minlength:5,
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
    sizeColorNames: {
        type: [ 
            {
                name: {
                    type:String,
                    enum:sizes,
                    required:true
                },
                colors: {
                    type: [
                        {
                            name :{
                                type:String,
                                required:true
                            },
                            qty: {
                                type:Number,
                                min:0,
                                required:true
                            },
                            _id:false,
                        }   
                    ]
            }
                
            }   
        ],
        validate:{
            validator: (value)=> value.length > 0,
            message: 'Sizes cannot be empty'
        },
        _id:false,
        unique:true
    },
    manufacturer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Manufacturer',
        required:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    fit: {
        type:String,
        enum:['regular','relaxed','slim','loose'],
        required:true
    },
    type:{
        type:String,
        enum:['t-shirts','polos','shirts','trousers','jeans','activewear'],
        required:true
    }

})

module.exports.productSchema = productSchema
module.exports.Product = mongoose.model('Product',productSchema)

