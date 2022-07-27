const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/', async(req, res)=>{
    try{
        console.log("here");
        const users = await User.find()
        
        res.json(users)
        // res.send("User get method");

    }catch(err){
        console.log(err);
        res.send(err);
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        // res.send(user)
        res.json(user)
    }catch(err){
        console.log(err);
    }
})

router.post('/', async(req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        type_of_user: req.body.type_of_user
    })
    try{
        const userSaved = await user.save()
        res.send(userSaved)
    }catch(err){
        console.log("User post method", err);
        res.send(err)
    }
});


module.exports = router