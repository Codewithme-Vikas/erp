const mongoose = require("mongoose");


const receivedschema = new mongoose.Schema({
    date : {type:Date, require:true}, 
    name : {type:String, required : true},
    received : {type:Number, required : true},
    
})

const receivedmodel = mongoose.model("received", receivedschema);
module.exports = receivedmodel; 


