const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    try{
        let {fullname, email, password} = req.body;
        let user = await userModel.findOne({email:email});
        if(user){
            req.flash('error', 'User already exists');
            return res.redirect('/');
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {

                if(err){
                    req.flash('error', err.message);
                    return res.redirect('/');
                }else
                {
                    let newUser = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    let token = generateToken(newUser);
                    res.cookie("token",token);
                    req.flash('success', 'User registered successfully');
                    return res.redirect('/');
                }
            });
        });
        
    }catch(err){
        req.flash('error', err.message);
        return res.redirect('/');
    }
};

module.exports.loginUser = async (req, res) => {
    try{
        let {email, password} = req.body;
        let user = await userModel.findOne({email:email});
        if(!user){
            req.flash('error', 'Email or password is incorrect');
            return res.redirect('/');
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
                req.flash('error', err.message);
                return res.redirect('/');
            }
            if(result){
                let token = generateToken(user);
                res.cookie("token",token);
                req.flash('success', 'User logged in successfully');
                return res.redirect('/shop');
            }else{
                req.flash('error', 'Email or password is incorrect');
                return res.redirect('/');
            }
        });
        
    }catch(err){
        req.flash('error', err.message);
        return res.redirect('/');
    }
};

module.exports.logoutUser = async (req, res) => {
    res.cookie("token","");
    req.flash('success', 'Logged out successfully');
    return res.redirect('/');
}

