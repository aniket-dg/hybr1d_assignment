const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    seller: {
        // false: Buyer, true: Seller
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('User', userSchema)

/*
usename
password
seller
*/