const express=require("express");
const router=express.Router();
const mysql=require("../../core/mySql");
var signIn=require("../register/signIn/signIn");
var signUp=require("../register/signUp/signUp");


router.get("/previousOrders",function(req,res){

var signInId=signIn.userId[signIn.userId.length-1];
var signUpId=signUp.userId[signUp.userId.length-1];
var userId=signInId;

    if(userId === undefined){

        userId=signUpId;
    }
    var selctPetDetailsQuery="select petType,petbreed,petColor,soldDate,sold_price,Sid from pets_sold where csid="+userId;   
    var sql=mysql.query(selctPetDetailsQuery,function(err,result){
        if(err){
            throw err;
        }
        console.log(JSON.stringify(result[0].soldDate).slice(0,11));
        res.render("previousOrders",{Orders:result});
    })
    
});

router.post("/cancelOrder/:Sid",function(req,res){
      
    var sid=req.params.Sid;
    console.log(sid);

// Selecting * from pets_sold table

        var querySelect="select * from pets_sold  where sid="+sid;
        var sqlSelect=mysql.query(querySelect,function(err,resultSelect){
        
            if(err){
                throw err;
        }

            var petType=resultSelect[0].PetType;

            if(petType === "Dog"){

            //If its a dog Insert it back into dogs table
            let breed=resultSelect[0].Petbreed;
            let age=resultSelect[0].petAge;
            let color=resultSelect[0].petColor;
            let price=resultSelect[0].sold_price;
            let img=resultSelect[0].img;
             
            var queryInsertDog="INSERT INTO Dogs (Dbreed,Dage,Dcolor,Dprice,img) VALUES ( '" + breed + "',"+ age + ", '" + color + "', " + price + ",'" + img + "');" 
            var  sqlInsertDog=mysql.query(queryInsertDog,function(err,result){
                if(err){
                    throw err;
                }
                console.log("Items inserted to dogs table sucsessfully!");
            }) 
        }

            if(petType === "Cat"){
            
            //If its a cat Inserting into back into cats table
            let breed=resultSelect[0].Petbreed;
            let age=resultSelect[0].petAge;
            let color=resultSelect[0].petColor;
            let price=resultSelect[0].sold_price;
            let img=resultSelect[0].img;
             
            var queryInsertCat="INSERT INTO Cats (Cbreed,Cage,Ccolor,Cprice,img) VALUES ( '" + breed+ "',"+ age + ", '" + color + "', " + price + ",'" + img + "');" 
            var  sqlInsertCat=mysql.query(queryInsertCat,function(err,result){
                if(err){
                    throw err;
                }
                console.log("Items inserted to Cats table sucsessfully!");
            })    
               
        }
     })
          

//delete from pets_sold
   var queryDelete="delete from pets_sold where sid="+sid;
   var sqlDelete=mysql.query(queryDelete,function(err,result){
       if(err){
           throw err;
       }
       console.log("Deleted from prts_sold successfully!");
   });

   res.redirect("/home");
   
});


module.exports=router;