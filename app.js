const express=require("express");
const bodyParser = require("body-parser");
const homeRoute=require("./routes/home/home");
const dogsRoute=require("./routes/dogs/dogs");
const customersRoute=require("./routes/customers/customers");
const catsRoute=require("./routes/cats/cats");
const signUpRoute=require("./routes/register/signUp/signUp");
const logInRoute=require("./routes/register/signIn/signIn");
const previousOrders=require("./routes/previousOrders/previousOrders");
const app=express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Routes
app.use(homeRoute);
app.use(dogsRoute);
app.use(catsRoute);
app.use(signUpRoute.router);
app.use(logInRoute.router);
app.use(customersRoute);
app.use(previousOrders);


//setting up the server
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  