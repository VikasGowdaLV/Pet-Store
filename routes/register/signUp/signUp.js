const express=require("express");
const router=express.Router();
const User=require('../../../core/user');
const user =new User(); 

router.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html");
});

router.post("/signUp",function(req,res){
    let userInput = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            console.log("Sucessfully Registerd");
            res.redirect("/home");
            
        }else {
            console.log('Error creating a new user ...');
        }
    });

});


module.exports=router;