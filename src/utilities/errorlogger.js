const fs = require('fs');
const { traceDeprecation } = require('process');

//log the error

let errorlogger = (err,req,res,next)=>{
    if(err) {
        fs.appendFile('ErrorLogger.txt',new Date() +"-"+err.stack+"\n", (error)=>{
            if(error){
                console.log("logging error Failed");
            }
        });
        if(err.status) {
            res.status(err.status);
        } else {
            res.status(500);
        }
        res.json({"message":err.message});
        next();
    }
}

module.exports = errorlogger;