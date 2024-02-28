const customermodel = require("../models/customer");
const salemodel = require("../models/sale");
const receivedmodel = require("../models/received")


const homepage = async (req, res) =>{
    try {
        const result = await customermodel.find();
        res.render("receivedlist", {data : result});    
    } catch (error) {
        console.log(error);
    }
}

const receivedamt = async (req, res) => {
    try {
        
        const name = req.params.name
        const data = await salemodel.find({customer_name: name})
        const receiveddata = await receivedmodel.find({name: name})
        
    
    res.render('received', {data, name, receiveddata});    
        
    } catch (error) {
        console.log(error);
    }    
}

const createdoc = async (req, res) =>{
    try {            
        const data = req.body;
        const receiveddoc = new receivedmodel({
            date : new Date(),  
            name : data.name,
            received : data.received,
        })              
        const result = await receiveddoc.save();   
        res.redirect("/receivedlist"); 
        
    } catch (error) {
        console.log(error);
    }
}  

module.exports = {homepage, receivedamt, createdoc};     
