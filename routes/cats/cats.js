const express=require("express");
const router=express.Router();
const mySql=require("../../core/mySql");

router.get("/cats",function(req,res){
    mySql.query("SELECT * FROM Cats ",(err,rows,fields)=>{
        if(!err){
         res.render("Cats",{
             Cats:rows
         });
     }
        else{
            console.log(err);
        }
    })
});

module.exports=router;