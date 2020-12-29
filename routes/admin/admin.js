const express=require("express");
// const fileUpload = require('express-fileupload');
const router=express.Router();
const mysql=require("../../core/mySql");

var bodyParser=require("body-parser");
var path = require('path');
// router.use(fileUpload());


router.get("/admin",function(req,res){

    res.render("adminLogin");
});

router.get("/adminHome",function(req,res){

    res.render("adminHome");
});

router.post("/adminLogin",function(req,res){
    const input={
        username:req.body.username,
        password:req.body.password
    }

  if(input.username === "admin" && input.password === "adminpassword"){
      res.render("adminHome");
  }else{
      res.send("<h1>Oops..you have given wrong admin credentials<\h1>");
  }
});


router.get("/adminInsertPet",function(req,res){
    res.render("adminInsertPet");
});

router.get("/adminDeleteDog",function(req,res){

    mysql.query("SELECT * FROM Dogs ",(err,rows,fields)=>{
        if(!err){
         res.render("AdminDeleteDog",{
             Dogs:rows
         });
     }
        else{
            console.log(err);
        }
    })
});

router.get("/adminDeleteCat",function(req,res){

    mysql.query("SELECT * FROM Cats ",(err,rows,fields)=>{
        if(!err){
         res.render("AdminDeleteCat",{
             Cats:rows
         });
     }
        else{
            console.log(err);
        }
    })
});

router.post("/adminDeleteDog/:Did",function(req,res){

    const Did=req.params.Did;
    
    var deletequery="Delete  FROM Dogs where Did ="+Did;

    mysql.query(deletequery,(err,rows,fields)=>{
        if(!err){
        console.log("dog deleted successfully!")
         res.redirect("/adminDeleteDog");
     }
        else{
            console.log(err);
        }
    })
});

router.post("/adminDeleteCat/:Cid",function(req,res){

    const Cid=req.params.Cid;
    
    var deletequery="Delete  FROM Cats where Cid ="+Cid;

    mysql.query(deletequery,(err,rows,fields)=>{
        if(!err){
        console.log("Cat deleted successfully!")
         res.redirect("/adminDeleteCat");
     }
        else{
            console.log(err);
        }
    })
});

router.post("/adminInsertPet",function(req,res){
    let data={
     petType:req.body.petType,
     petBreed:req.body.petBreed,
     petColor:req.body.petColor,
     petAge:req.body.petAge,
     petPrice:req.body.petPrice,
     
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    console.log(data);
    
    let petFile = req.files.sampleFile;
    var imageName=petFile.name;
    console.log(imageName);
  
    if(data.petType ==="Dog"){
       
        if(petFile.mimetype == "image/jpeg" ||petFile.mimetype == "image/png"){
                                 
            petFile.mv('public/images/dogs/'+petFile.name, function(err) {
                           
                if (err)
  
                  return res.status(500).send(err);
  
                   var sqlInsertDog = "INSERT INTO  dogs (Dbreed,Dage,Dcolor,Dprice,img) VALUES ( '"+ data.petBreed + "'," + data.petAge + ",'" + data.petColor+ "'," + data.petPrice+ ",'" + imageName+ "');";
  
                    var query = mysql.query(sqlInsertDog, function(err, result) {
  
                      console.log("Data added to dogs table successfully!");
                      res.render("successAdmin");
                    });
            });
        }
        else {
            res.send("This format is not allowed , please upload file with '.png' or '.jpg'");
          } 
      console.log(data);
    }
  
    if(data.petType === "Cat"){
        if(petFile.mimetype == "image/jpeg" ||petFile.mimetype == "image/png"){
                                 
            petFile.mv('public/images/cats/'+petFile.name, function(err) {
                           
                if (err)
  
                  return res.status(500).send(err);
  
                   var sqlInsertCat = "INSERT INTO  cats (Cbreed,Cage,Ccolor,Cprice,img) VALUES ( '"+ data.petBreed + "'," + data.petAge + ",'" + data.petColor+ "'," + data.petPrice+ ",'" + imageName+ "');";
  
                    var query = mysql.query(sqlInsertCat, function(err, result) {
  
                      console.log("Data added to cats table successfully!");
                      res.render("successAdmin");
                    });
            });
        }
        else {
            res.send("This format is not allowed , please upload file with '.png' or '.jpg'");
          } 
      console.log(data);
    }
  });


module.exports=router;