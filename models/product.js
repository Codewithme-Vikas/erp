const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    stockname : {type:String, required : true},
    unit : {type:String, required : true},
    qty : {type:Number},
    rate : {type:Number},
    value : {type:Number},
    cgst : {type:String},
    sgst : {type:String},
    igst : {type:String}
})

const productmodel = mongoose.model("product", productschema);
module.exports = productmodel; 


