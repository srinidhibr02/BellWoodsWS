const express = require('express');
const router = express.Router();
const service = require('../service/userService');
const jwt = require('jsonwebtoken');
const encrypting = require('../utilities/encryption');
//login routing
router.route('/login')
.post(async (req,res,next)=>{
    let userName = req.body.username;
    let password = req.body.password;
    //console.log(userName+' '+password);
    try{
        let details = await service.login(userName,password);
        let payload = {subject:details[0]._id};
        let genToken = jwt.sign(payload , 'bellwoods')
        res.json({genToken});
    }
    catch(err){
        next(err)
    }
})

class UserClass{
    static count = 1001;
    static getUsedID(){
        this.count++;
        return this.count;
    }
}

//register routing
router.route('/register')
.post(async (req,res,next)=>{
    try{
        let id = UserClass.getUsedID();
        let sid = "U"+id;
        let name;
        if(req.body.lastname){
            name = req.body.firstname+' '+req.body.lastname;
        }else name = req.body.firstname;
        let pass = encrypting.encrypt(req.body.password);
        
        let userData = {
            "userId":sid,
            "userCredentials":{
                "userName":req.body.username,
                "password":pass
            },
            "userProfile":{
                "name":name,
                "userDOB":req.body.dob,
                "userPhone":req.body.phone,
                "userEmail":req.body.email
            }
            
        }
        let response = await service.register(userData);
        if(response){
            res.json({"message":`Successfully registered with user name ${req.body.username}`});
        }
    }catch(err){
        next(err);
    }
})

router.route('/:userName').get(
    async (req,res,next)=>{
        let uName = req.params.userName;
        try{
            let details = await service.fetchUser(uName);
            res.send(details);
        }catch(error){
            next(error);
        }
    }
)

module.exports = router;