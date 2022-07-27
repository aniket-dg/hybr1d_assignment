const express = require('express')
const mongoose = require('mongoose')
const url  = 'mongodb://localhost/ecommerce'
const app = express()


mongoose.connect(url, {useNewUrlParser: true})

const con = mongoose.connection

con.on('open', ()=>{
    console.log("Database Connected");
});

app.use(express.json())

const userRouter = require('./routers/users')

app.use('/users', userRouter)

app.listen(9000, () => {
    console.log("Server listen on localhost");
})