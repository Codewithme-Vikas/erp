const express = require("express");
const route = express.Router()

const home = require("../controler/customer");
const product = require("../controler/product");
const sale = require("../controler/sale")
const received = require("../controler/received")

route.get("/", home.dashboard);
route.get("/customer", home.homepage);
route.post("/customer", home.createdoc);      
route.get("/customer/edit/:id", home.editdoc); 
route.post("/customer/update/:id", home.updatedoc); 
route.post("/customer/delete/:id", home.deletedoc);   
route.get("/customerlist", home.viewtdoc);
route.get("/customer/report/:name", home.viewreport);

route.get("/product", product.homepage);
route.post("/product", product.createdoc);
route.get("/product/edit/:id", product.editdoc);
route.post("/product/update/:id", product.updatedoc);
route.post("/product/delete/:id", product.deletedoc);
route.get("/productlist", product.viewdoc); 

route.get("/sale", sale.homepage);
route.post("/sale", sale.createdoc);
route.get("/salereport", sale.salereport);          
route.get("/sale/edit/:id", sale.editdoc);
route.post("/sale/update/:id", sale.updatedoc);
route.get("/printsale/:id", sale.printsale) 

route.get("/receivedlist", received.homepage);
route.get("/receivedlist/:name", received.receivedamt);
route.post("/receivedlist/:name", received.createdoc)

module.exports = route;  
