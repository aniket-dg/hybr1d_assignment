const express = require('express')
const mongoose = require('mongoose')
const url  = 'mongodb://localhost/ecommercev1'
const app = express()
const userRouter = require('./routers/users')
const productRouter = require('./routers/products')
const buyers = require('./routers/buyers')
const sellers = require('./routers/sellers')



mongoose.connect(url, {useNewUrlParser: true})

const con = mongoose.connection

con.on('open', ()=>{
    console.log("Database Connected");
});

app.use(express.json())


app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/buyer', buyers)
app.use('/seller', sellers)



app.listen(9000, () => {
    console.log("Server listen on localhost");
})