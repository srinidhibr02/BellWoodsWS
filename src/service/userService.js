let dbLayer = require('../model/userModel');
let user = {};

//login service
user.login = async(username,password)=>{
    let loginDetails = await dbLayer.userLogin(username,password);
    if(loginDetails){
        return loginDetails;
    }
}
//register service
user.register = async(userData) => {
    let data = await dbLayer.userRegister(userData);
    if(data){
        return data;
    }else{
        let err = new Error("Unable to register");
        err.status = 404;
        throw err;
    }
}

user.fetchUser = async(userName) =>{
    let data = await dbLayer.fetchUser(userName);
    if(data){
        return data;
    }else{
        let err = new Error('Nothing found');
        err.status = 401;
        throw err;
    }
}
module.exports = user;