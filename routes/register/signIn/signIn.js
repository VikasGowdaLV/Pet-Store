const express=require("express");
const router=express.Router();
const User=require("../../../core/user");
const user=new User();

router.get("/signIn",function(req,res){
    res.sendFile(__dirname+"/signIn.html");
});

router.post("/signIn",function(req,res){
    user.login(req.body.email,req.body.password,function(result){
        if(result) {
            // Store the user data in a session.
         console.log("Logged in sucsessfully");
            // redirect the user to the home page.
            res.redirect('/home');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('<h1>Oopss...Email/Password is incorrect!</h1>');
        }
    })
});

module.exports=router;