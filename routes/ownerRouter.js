const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner');
const owner = require('../models/owner');

if(process.env.NODE_ENV === 'development'){
    router.post("/create", async (req, res) => {
        let owners = ownerModel.find();
        if(owners.length>0){
            return res.send('Owner already exists');
        }
        
            let {fullname, email, password} = req.body;
            let newOwner = await ownerModel.create({
                fullname,
                email,
                password
            });

            res.send("newOwner created");
        
})}
router.get('/admin', (req, res) => {
    let success = req.flash("success");
    res.render('createproducts', {success});
}); 



module.exports = router;