const express=require("express");
const router=express.Router();
const mysql=require("../../core/mySql");
var signIn=require("../register/signIn/signIn");
var signUp=require("../register/signUp/signUp");




router.get("/home",function(req,res){

    var signInId=signIn.userId[signIn.userId.length-1];
    var signUpId=signUp.userId[signUp.userId.length-1];
    var userId=signInId;

    if(userId === undefined){

        userId=signUpId;
    }
    // console.log(userId);
    
    var selectNamequery="SELECT firstName from users WHERE id ="+ userId;
    var sql=mysql.query(selectNamequery,function(err,result){
        if(err){
            throw err;
        }
        // console.log(result[0]);
        res.render("home",{firstName:result[0].firstName});
    })
    
});

module.exports=router;