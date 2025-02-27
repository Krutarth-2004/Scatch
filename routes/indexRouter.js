const express = require('express'); 
const router = express.Router();

const productModel = require('../models/product');
const userModel = require('../models/user');

const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('index', {success,error,loggedin : false});
}
);   

router.get('/shop', isLoggedIn,async (req, res) => {
    
    let products = await productModel.find();
    let success = req.flash('success');
    res.render('shop', {products,success});
}
);

router.get('/cart', isLoggedIn,async (req, res) => {
    
    let user = await userModel.findById(req.user._id).populate('cart');
    let products = user.cart;
    res.render('cart', {products});
}
);

router.get("/cart/add/:id", isLoggedIn, async (req, res) => {
    
    let user  = await userModel.findById(req.user._id);
    user.cart.push(req.params.id);
    await user.save();
    req.flash('success', 'Product added to cart');
    res.redirect('/shop');
}
);



module.exports = router;