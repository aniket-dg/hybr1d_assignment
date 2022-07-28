const express = require('express')
const router = express.Router()
const Order = require('./../models/orders')


router.get('/', async(req, res) => {
    const orders = await Order.find({}).exec();
    res.json(orders);
});

module.exports = router