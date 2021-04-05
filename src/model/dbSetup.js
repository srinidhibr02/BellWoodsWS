const collection = require('../utilities/connection');

const userData = [
    {
        "userId":"U1001",
        "userCredentials":{
            "userName":"abcde02",
            "password":"Abc@2020"
        },
        "userProfile":{
            "name":"Abcd Efgh",
            "userDOB":"2021-01-01",
            "userPhone":7406132004,
            "userEmail":"abcde02@gmail.com"
        }
    }
]

const categories = [
    {
        "categoryId":1,
        "categoryName":"Chairs"
    },
    {
        "categoryId":2,
        "categoryName":"Sofa"
    },
    {
        "categoryId":3,
        "categoryName":"Table"
    }
];

const product = [
    {
        "prodId":"P1001",
        "catId":1,
        "product":{
            "productPrice":450,
            "sellingPrice":400,
            "name":"Gray Working Chair",
            "description":"Cafe chairs , for a beautiful and glamorous sight",
            "madeIn":"India",
            "postedOn": "2021-01-01",
            "colors":["red","green","yellow"]
        },
        "dimensions":{
            "length":55,
            "breadth":35,
            "height":85
        }
    },

    {
        "prodId":"P1002",
        "catId":2,
        "product":{
            "productPrice":35000,
            "sellingPrice":32500,
            "name":"Sofa G002",
            "description":"Sofas are made up of wood and stainless steel, pvc leather.",
            "madeIn":"India",
            "postedOn": "2021-01-05"
        },
        "dimensions":{
            "length":800
        }
    }

]
let create = {}

create.setupDB = async()=>{
    const userColl = await collection.getuserCollection();
    const data = await userColl.deleteMany();
    const result = await userColl.insertMany(userData);
    
    if(result && result.length>0){
        return result.length;
    } else return null;
}

create.setupProductDB = async() => {
    const prodColl = await collection.getProductCollection();
    const data = await prodColl.deleteMany();
    const result = await prodColl.insertMany(product);

    if(result && result.length>0){
        return result.length;
    } else return null;
}

module.exports = create;