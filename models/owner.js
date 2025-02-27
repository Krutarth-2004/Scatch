const mangoose = require('mongoose');

const ownerSchema = mangoose.Schema({
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
    
    products: {
        type: Array,
        default: []
    },
    
    picture: String,
    gstin : String


});

module.exports = mangoose.model('owner', ownerSchema);