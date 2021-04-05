const {Schema} = require('mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex',true);
const url = 'mongodb://localhost:27017/Woods';
//schema for orders placed
const ordersSchema = Schema({
    pId :{type:Number,required:[true,'Product Id is required']},
    quantity:{type:Number,required:[true,'Quantity is required']},
    orderDate:{type:Date,default: new Date().toISOString()},
    totalAmount:{type:Number,required:[true,'Total amount is required']}
});
//const user Cart Schema
const cartSchema = Schema({
    pId :{type:Number,required:[true,'Product Id is required']},
    quantity:{type:Number,required:[true,'Quantity is required']}
})
//schema for categories we are providing
const categorySchema = Schema({
    categoryId :{type:String,required:[true,'Category Id is required']},
    categoryName :{type:String,required:[true,'Category Name is required']}
}, {collection:'Category', timestamps:true})

const productSchema = Schema({
    prodId :{type:String,required:[true,'Product Id is required']},
    catId :{type:Number,required:[true,'Category Id is required']},
    product:{
        productPrice:{type:Number,required:[true,'Product Price is required']},
        sellingPrice:{type:Number,required:[true,'Selling Price is required']},
        name:{type:String,required:[true,'Product name is required']},
        description:{type:String,required:[true,'Product description is required']},
        madeIn:{type:String,required:[true,'Made-In is required']},
        postedOn:{type:Date,default: new Date().toISOString()},
        colors:{type:Array}
    },
    dimensions:{
        type:Object,default:{}
    }
}, {collection:'Products', timestamps:true});

const userSchema = Schema({
    userId:{type:String , required : [true,'user ID is required']},
    userCredentials:{
        userName:{type:String,required:[true,'User Name is required']},
        password:{type:Object , required:[true,'Password is required']}
    },
    userProfile: {
        name: {type:String,required:[true,'Name is required']},
        userDOB:{type:Date,required:[true,'Date of Birth is required']},
        userPhone:{type:Number,required:[true,'Phone No. is required']},
        userEmail:{type:String,required:[true,'Email Id is required']},
        userDateJoined:{type:Date,default: new Date().toISOString()},
        userLastLogin : {type:Date,default: new Date().toISOString()}
    },
    uOrders:{type:[ordersSchema],default:[]},
    uCart:{type:[cartSchema],default:[]}
} , {collection:'Users', timestamps:true})

let connection = {};

connection.getProductCollection = () => {
    return mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}).then(database =>{
        return database.model('Products', productSchema)
    }).catch(error => {
        let err = new Error('Could not connect to database');
        err.status = 500;
        throw err;
    })
}

connection.getuserCollection = () => {
    return mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology:true}).then(database => {
        return database.model('Users',userSchema)
    }).catch(error => {
        let err = new Error("Could not connect to database");
        err.status = 500;
        throw err;
    });
}


module.exports = connection;
