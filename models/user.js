const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
        
    },
    picture: String


});

module.exports = mongoose.model('user', userSchema);