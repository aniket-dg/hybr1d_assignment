const express = require('express')
const mongoose = require('mongoose')
const url  = 'mongodb://localhost/ecommercev1'
const app = express()
const morgan = require("morgan");
const userRouter = require('./routers/users')
const productRouter = require('./routers/products')
const buyers = require('./routers/buyers')
const sellers = require('./routers/sellers')
const orders = require('./routers/orders')
const bodyParser = require("body-parser");



mongoose.connect(url, {useNewUrlParser: true})

const con = mongoose.connection

con.on('open', ()=>{
    console.log("Database Connected");
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/buyer', buyers)
app.use('/seller', sellers)
app.use('/orders', orders)




app.listen(9000, () => {
    console.log("Server listen on localhost");
})