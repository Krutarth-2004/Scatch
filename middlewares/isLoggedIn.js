const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const isLoggedIn = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash('error', 'Login required');
        return res.redirect('/');
    }
    try {
        
            let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            
            let user = await userModel.findById(decoded.id).select('-password');
            
        
                req.user = user;
                
                next();
            
    } catch (err) {
        req.flash('error', 'something went wrong');
        res.redirect('/');
    }
}

module.exports = isLoggedIn;