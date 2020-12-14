const express=require("express");
const router=express.Router();
const mySql=require("../../core/mySql");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy+"-"+mm+"-"+dd;

router.get("/customers",function(req,res){
    res.render("customers");
});

router.post("/customers",function(req,res){
    let data={
    ContactNumber:req.body.contactNumber,
    Fname:req.body.fname,
    Lname:req.body.lname,
    Pincode:req.body.pincode,
    Address:req.body.address,
    City:req.body.city,
    Landmark:req.body.landmark,
    email:req.body.email,
    PetId:req.body.petId,
    PetType:req.body.petType
};

console.log(today);
console.log(data.PetType);

//Inert into customer table
var sqlInsertCustomer="INSERT INTO customers (ContactNumber,Fname,Lname,Pincode,Address,City,Landmark,email,PetId,PetType) VALUES ( "+ data.ContactNumber + ", '" + data.Fname + "', '" + data.Lname + "', " + data.Pincode + ",'" + data.Address + "','" + data.City + "','" + data.Landmark + "','" + data.email + "','" + data.PetId + "','" + data.PetType+ "');";
let queryOne=mySql.query(sqlInsertCustomer,data,function(err,result){
    if(err){
        throw err;
    }
        console.log("Customer detials saved succcessFully");
    
});



if(data.PetType === "Dog"){
    // selcting dog breed and dog price
    var sqlBred="SELECT Dbreed,Dprice from dogs where Did = "+data.PetId;
    let queryThree=mySql.query(sqlBred,data,function(err,result){
        if(err){
            console.log(err)
        }
        
//inserting into pets_sold
    var sqlInsertPetSold="INSERT INTO  pets_sold (PetType,SoldDate,Petbreed,sold_price,PetId) VALUES ( '"+ data.PetType + "', '" + today + "', '" + result[0].Dbreed + "', " + result[0].Dprice + "," + data.PetId + ");";
    let queryOne=mySql.query(sqlInsertPetSold,data,function(err,resultOne){
        if(err){
            throw err;
        }
            console.log("Data succcessfully saved in pets_Sold db");
        
    });
    
  });

  // delete the pet from dogs table   
var sqlDeletePet="DELETE FROM Dogs Where Did = "+ data.PetId;
let queryTwo=mySql.query(sqlDeletePet,data,function(err,result){
if(err){
        console.log(err);
}
  console.log("Successfully deleted pet from the data base!");
});

}

if(data.PetType === "Cat"){
    //Selecting cat breed and cat price
    var sqlBred="SELECT Cbreed,Cprice from cats where Cid = "+data.PetId;
    let queryThree=mySql.query(sqlBred,data,function(err,result){
        if(err){
            console.log(err)
        }
        
//inserting into pets_sold
    var sqlInsertPetSold="INSERT INTO pets_sold (PetType,SoldDate,Petbreed,sold_price,PetId) VALUES ( '"+ data.PetType + "', '" + today + "', '" + result[0].Cbreed + "', " + result[0].Cprice + "," + data.PetId + ");";
    let queryOne=mySql.query(sqlInsertPetSold,data,function(err,resultOne){
        if(err){
            throw err;
        }
            console.log("Data succcessfully saved in pets_Sold db");
        
    });
    
    });

  // delete the pet from dogs table   
  var sqlDeletePet="DELETE FROM Cats Where Cid = "+ data.PetId;
  let queryTwo=mySql.query(sqlDeletePet,data,function(err,result){
  if(err){
          console.log(err);
  }
    console.log("Successfully deleted pet from the data base!");
  });
    

}

res.redirect('/home');


});


module.exports=router;