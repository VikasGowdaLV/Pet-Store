const express=require("express");
const router=express.Router();
const mySql=require("../../core/mySql");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

router.get("/dogs",function(req,res){

   mySql.query("SELECT * FROM Dogs ",(err,rows,fields)=>{
       if(!err){
        res.render("Dogs",{
            Dogs:rows
        });
    }
       else{
           console.log(err);
       }
   })
});

module.exports=router;