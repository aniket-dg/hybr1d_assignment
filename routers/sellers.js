const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/users')
const Product = require('../models/products')
const Order = require('../models/orders')

const authMixin = require('../middlewares/auth')
const sellerMixin = require('../middlewares/seller_mixin')


router.post('/create-catalog', authMixin, sellerMixin, (req, res) => {
    try {
        for (var item of req.body.products) {
            const seller = req.userData;
            const product = new Product({
                name: item.name,
                price: item.price,
                seller: req.userData._id
            });
            product.save()
                .then(result => {
                    console.log("Product created");
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        
        
        }
        res.status(200).json({
            'result': "Products added!"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});



router.get('/orders', authMixin, sellerMixin,async(req, res)=>{
    try{
        const seller = req.userData
        const orders = await Order.find({ seller: seller._id }).exec();
        res.status(200).json(orders)
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router