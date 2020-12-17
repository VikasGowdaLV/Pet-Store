const express=require("express");
const router=express.Router();
const mySql=require("../../core/mySql");
const bodyParser = require("body-parser");
var signIn=require("../register/signIn/signIn");
var signUp=require("../register/signUp/signUp");
router.use(bodyParser.urlencoded({extended: true}));

var dogId=[];
var catId=[];





var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy+"-"+mm+"-"+dd;


// **************** All realted to dogs *********************************************

router.get("/dogsCustomers/:dogId",function(req,res){
    const id=req.params.dogId;
    res.render("customersDogs");
    dogId.push(id);

});

router.post("/customersDogs",function(req,res){
    let data={
    ContactNumber:req.body.contactNumber,
    Fname:req.body.fname,
    Lname:req.body.lname,
    Pincode:req.body.pincode,
    Address:req.body.address,
    City:req.body.city,
    Landmark:req.body.landmark,
    email:req.body.email,
    PetId:dogId[dogId.length-1],
    PetType:"Dog"
};

var signInId=signIn.userId[signIn.userId.length-1];
var signUpId=signUp.userId[signUp.userId.length-1];
var userId=signInId;

    if(userId === undefined){

        userId=signUpId;
    }




//Inert into customer table
var sqlInsertCustomer="INSERT INTO customers (csid,ContactNumber,Fname,Lname,Pincode,Address,City,Landmark,email,PetId,PetType) VALUES ( "+ userId + ","+ data.ContactNumber + ", '" + data.Fname + "', '" + data.Lname + "', " + data.Pincode + ",'" + data.Address + "','" + data.City + "','" + data.Landmark + "','" + data.email + "','" + data.PetId + "','" + data.PetType+ "');";
let queryOne=mySql.query(sqlInsertCustomer,data,function(err,result){
    if(err){
        throw err;
    }
        console.log("Customer detials saved succcessFully");
    
});


    // selcting dog breed and dog price
    var sqlBred="SELECT * from dogs where Did = "+ data.PetId;
    let queryThree=mySql.query(sqlBred,data,function(err,result){
        if(err){
            console.log(err)
        }
        
        console.log(result);
//inserting into pets_sold
    var sqlInsertPetSold="INSERT INTO  pets_sold (PetType,SoldDate,Petbreed,sold_price,PetId,csid,petColor,petAge,img) VALUES ( '"+ data.PetType + "', '" + today + "', '" + result[0].Dbreed + "', " + result[0].Dprice + "," + data.PetId + "," + userId + ",'" + result[0].Dcolor+ "'," + result[0].Dage + ",'" + result[0].img+ "');";
    let queryOne=mySql.query(sqlInsertPetSold,data,function(err,resultOne){
        if(err){
            throw err;
        }
            console.log("Data succcessfully saved in pets_Sold db");
        
    });
    
  });

//   delete the pet from dogs table   
var sqlDeletePet="DELETE FROM Dogs Where Did = "+ data.PetId;
let queryTwo=mySql.query(sqlDeletePet,data,function(err,result){
if(err){
        console.log(err);
}
  console.log("Successfully deleted pet from the data base!");
});
  
dogId.pop();

//order successfull message
var querySucsCat="select * from dogs where Did ="+data.PetId;
var sqlSucsCat=mySql.query(querySucsCat,function(err,result){
    if(err){
        throw err;
    }
    res.render("success",{
        Petbreed:result[0].Dbreed,
        Petcolor:result[0].Dcolor
    });
});



});

// **************************  All related to catsss *********************************

router.get("/catsCustomers/:catId",function(req,res){
    const id=req.params.catId;
    res.render("customersCats");
    catId.push(id);
    

});

router.post("/customersCats",function(req,res){
    let data={
    ContactNumber:req.body.contactNumber,
    Fname:req.body.fname,
    Lname:req.body.lname,
    Pincode:req.body.pincode,
    Address:req.body.address,
    City:req.body.city,
    Landmark:req.body.landmark,
    email:req.body.email,
    PetId:catId[catId.length-1],
    PetType:"Cat"
};

var signInId=signIn.userId[signIn.userId.length-1];
var signUpId=signUp.userId[signUp.userId.length-1];
var userId=signInId;

    if(userId === undefined){

        userId=signUpId;
    }

 //Inert into customer table
var sqlInsertCustomer="INSERT INTO customers (csid,ContactNumber,Fname,Lname,Pincode,Address,City,Landmark,email,PetId,PetType) VALUES ( "+ userId + ","+ data.ContactNumber + ", '" + data.Fname + "', '" + data.Lname + "', " + data.Pincode + ",'" + data.Address + "','" + data.City + "','" + data.Landmark + "','" + data.email + "','" + data.PetId + "','" + data.PetType+ "');";
let queryOne=mySql.query(sqlInsertCustomer,data,function(err,result){
    if(err){
        throw err;
    }
        console.log("Customer detials saved succcessFully");
    
});


    //Selecting cat breed and cat price
    var sqlBred="SELECT * from cats where Cid = "+ data.PetId;
    let queryThree=mySql.query(sqlBred,data,function(err,result){
        if(err){
            console.log(err)
        }
        
//inserting into pets_sold
    var sqlInsertPetSold="INSERT INTO pets_sold (PetType,SoldDate,Petbreed,sold_price,PetId,csid,petColor,petAge,img) VALUES ( '"+ data.PetType + "', '" + today + "', '" + result[0].Cbreed + "', " + result[0].Cprice + "," + data.PetId + "," + userId+ ",'" + result[0].Ccolor+ "'," + result[0].Cage+ ",'" + result[0].img+ "');";
    let queryOne=mySql.query(sqlInsertPetSold,data,function(err,resultOne){
        if(err){
            throw err;
        }
            console.log("Data succcessfully saved in pets_Sold db");
        
    });
    
    });

  // delete the pet from cats table   
  var sqlDeletePet="DELETE FROM Cats Where Cid = "+ data.PetId;
  let queryTwo=mySql.query(sqlDeletePet,data,function(err,result){
  if(err){
          console.log(err);
  }
    console.log("Successfully deleted pet from the data base!");
  });
    
  catId.pop();
 
  //order successfull message
  var querySucsCat="select * from cats where Cid ="+ data.PetId;
  var sqlSucsCat=mySql.query(querySucsCat,function(err,result){
      if(err){
          throw err;
      }
      res.render("success",{
          Petbreed:result[0].Cbreed,
          Petcolor:result[0].Ccolor
      });
  });


});




module.exports=router;