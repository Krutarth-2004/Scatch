const { text } = require('express');
const mangoose = require('mongoose');

const productSchema = mangoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        
        default: 0
    },
    bgcolor: {
        type: String,
        
    },
    panelcolor: {
        type: String,
        
    },
    textcolor: {
        type: String,
    
    },
    image: Buffer
});

module.exports = mangoose.model('product', productSchema);