const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/users')
const Product = require('../models/products')
const Order = require('../models/orders')
const authMixin = require('./../middlewares/auth')



router.get('/list-of-sellers', authMixin,async(req, res)=> {
    const sellerList = await User.find({seller:true}, 'id').exec();
    res.status(200).json(sellerList);

})

router.get('/seller-catalog/:seller_id', async(req, res)=>{
    const catalogList = await Product.find({seller: req.params.seller_id}).exec();
    res.status(200).json(catalogList);
});


router.post('/create-order/:seller_id', authMixin,async(req, res)=>{
    try{
        const seller = req.params.seller_id
        
        for (var item of req.body.orders){
            const product = await Product.findById(item.productId);
            const user = req.userData;
            
            const quantity = item.quantity ? item.quantity : 1 
            const order = new Order({
                userId: user._id,
                productName: product.name,
                quantity: quantity,
                price: product.price * quantity,
                isOrdered: req.body.isOrdered,
                seller: seller
            })
            order.save()
                .then(result => {
                    console.log("Product added to Order");
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
        res.status(200).json({
            'result': "Order Placed!"
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router