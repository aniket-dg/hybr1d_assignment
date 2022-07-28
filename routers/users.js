const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* For Testing Purpose
router.get('/', async(req, res)=>{
    const users =await User.find({}).exec()
    res.json(users);
});
*/



// Signup
router.post('/register', async (req, res) => {
    console.log(req.body);
    User.find({
        username: req.body.username
    }).exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Username already exist!"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new User({
                            username: req.body.username,
                            password: hash,
                            seller: req.body.seller
                        });
                        user.save()
                            .then(result => {
                                res.status(200).json({
                                    message: "User Created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }

                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Login 
router.post('/login', (req, res) => {
    User.find({
        username: req.body.username
    })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Authentication Failed!"
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err || !result) {
                    return res.status(404).json({
                        message: "Authentication Failed!"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    })
                    return res.status(200).json({
                        message: "Authentication Successfull",
                        token: token
                    });
                }

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router