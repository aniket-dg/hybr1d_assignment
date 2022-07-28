const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    isOrdered: {
        type: Boolean,
        default: true
    },
    seller: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Order', orderSchema)