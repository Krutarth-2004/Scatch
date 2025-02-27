const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
const upload = require('../config/multer');


router.post('/create', upload.single("image"),async (req, res) => {    
    try{let {name, price, discount,bgcolor,panelcolor,textcolor} = req.body;

    let product = await productModel.create({
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
        image: req.file.buffer
    });
    req.flash('success', 'Product created successfully');
    res.redirect('/owners/admin');
    }
    catch(err){
        
        res.send(err.message);
    }
}
);

module.exports = router;