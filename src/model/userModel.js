const collection = require('../utilities/connection');
const encrypting = require('../utilities/encryption');
let user = {}

user.userLogin = async (username, password) => {
    const userColl = await collection.getuserCollection();
    const data = await userColl.find({ "userCredentials.userName": username });
    if (data.length > 0) {
        const passDB = data[0]['userCredentials']['password'];
        //console.log(encrypting.decrypt(passDB));
        if (password === encrypting.decrypt(passDB)) {
            return userColl.updateOne({ "userCredentials.userName": username }, { $set: { "userProfile.userLastLogin": new Date().toISOString() } }).then(res => {
                if (res.nModified == 1) {
                    return data
                }
            })
        } else {
            let err = new Error('Password is incorrect');
            err.status = 401
            throw err;
        }
    } 
    else {
        let err = new Error('You\'re not registered');
        err.status = 404;
        throw err;
    }
}

user.userRegister = async (data) => {
    let userColl = await collection.getuserCollection();
    let existUserName = await userColl.find({ "userCredentials.userName": data.userCredentials.userName })
    let existEmail = await userColl.find({ "userProfile.userEmail": data.userProfile.userEmail })
    if (existEmail.length == 0) {
        if (existUserName.length == 0) {
            const result = userColl.insertMany(data);
            if (result) {
                return result;
            } else {
                let err = new Error("data not inserted");
                err.status = 500;
                throw err;
            }
        } else {
            // let err = new Error(`User already exists with Email-Id ${data.userProfile.userEmail}`);
            let err = new Error(`User already exists with username ${data.userCredentials.userName}`);
            err.status = 500;
            throw err;
        }
    } else {
        let err = new Error(`User already exists with Email-Id ${data.userProfile.userEmail}`);
        // let err = new Error(`User already exists with username ${data.userCredentials.userName}`);
        err.status = 500;
        throw err;
    }
}

user.fetchUser = async(userName) =>{
    const userColl = await collection.getuserCollection();
    const data = await userColl.findOne({ "userCredentials.userName": userName });
    if (data != null) {
        const userDetails = {
            fullName : data.userProfile.name,
            userDOB : data.userProfile.userDOB,
            userPhone : data.userProfile.userPhone,
            userEmail : data.userProfile.userEmail,
            userOrders : data.uOrders,
            userCart : data.uCart
        }
        return userDetails;
    } else {
        let err = new Error(`User fetch error for ${userName}`);
        err.status = 404;
        throw err;
    }
}

module.exports = user;