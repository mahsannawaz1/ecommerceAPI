const mongoose = require('mongoose')


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
                    enum:['6-12M','12-18M','18-24M','2-3Y','3-4Y','4-5Y','5-6Y','6-7Y','7-8Y','8-9Y','9-10Y','10-11Y','11-12Y','13-14Y','XS','S','M','L','XL','2XL'],
                    required:true
                },
                colors: [
                        {
                            name :{
                                type:String,
                                validate:{
                                    validator: (value)=> value.length > 0,
                                    message: 'Colors cannot be empty'
                                },
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
    }

})

module.exports.productSchema = productSchema
module.exports.Product = mongoose.model('Product',productSchema)

