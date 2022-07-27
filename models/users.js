const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type_of_user: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('User', userSchema)

/*
usename
password
types_of_user : buyer/seller
*/