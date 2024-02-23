const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config()

const web = require("./route/web");
//  database connection
const mdconnection = require("./connection/mdconnection");
mdconnection();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine", "ejs");

// routes
app.use("/",web);


// listen on port
app.listen( process.env.PORT, ()=> { 
    console.log("Create Server Successfully"); 
});