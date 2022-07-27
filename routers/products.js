const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Product = require('../models/products')
const authCheck = require('../middlewares/auth')

router.get('/list', authCheck,async(req, res) => {
    const productList = await Product.find({});
    res.json(productList);
});


// Only for dev
// router.get

module.exports = router