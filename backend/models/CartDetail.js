const { number } = require('joi')
const { min } = require('lodash')
const mongoose = require('mongoose')

const cardDetailSchema = mongoose.Schema({
    cardType:{
        type:String,
        enum:['Visa','MasterCard'],
        min:16,
        max:16,
        required:true
    },
    cardNumber:{
        type:String,
        required:true
    },
    expireMonth:{
        type:Number,
        min:1,
        max:12,
        required:true
    },
    expireYear:{
        type:Number,
        min:new Date().getFullYear(),
        required:true
    },
    CVN: {
        type:Number,
        min:3,
        max:4,
        required:true
    }


})
module.exports = mongoose.model('CardDetail',cardDetailSchema)