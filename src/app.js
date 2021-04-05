const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorLogger = require('./utilities/errorlogger');

const productRouter = require('./routes/productRouting');
const userRouter = require('./routes/routing');
const create = require('./model/dbSetup');
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/user/setupDB", (req, res, next) => {
    create.setupDB().then(response => {
        if (response) res.json({ message: "Succesfully inserted " + response + " documents into database" })
    }).catch(error => {
        next(error);
    })
});

app.get("/product/setupProductDB", (req, res, next) => {
    create.setupProductDB().then(response => {
        if (response) res.json({ message: "Succesfully inserted " + response + " documents into database" })
    }).catch(error => {
        next(error);
    })
})

app.use('/user', userRouter);
app.use('/product',productRouter);
app.use(errorLogger);

app.listen(port);
console.log('Service started at '+port);