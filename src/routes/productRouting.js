const express = require('express');
const productRouter = express.Router();

productRouter.route('/:category')
.get((req,res,next)=>{
    res.send('Working fine till here');
})

module.exports = productRouter;