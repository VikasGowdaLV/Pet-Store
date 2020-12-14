const express=require("express");
const router=express.Router();

router.get("/home",function(req,res){
    res.sendFile(__dirname+"/home.html")
});

module.exports=router;