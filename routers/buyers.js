const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/users')
const Product = require('../models/products')


router.get('/list_of_sellers', async(req, res)=> {
    const sellerList = await User.find({seller:true}, 'id').exec();
    res.json(sellerList);

})

router.get('/seller-catalog/:seller_id', async(req, res)=>{
    const catalogList = await Product.find({seller: req.params.seller_id}).exec();
    res.json(catalogList);
});

module.exports = router