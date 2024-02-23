const mongoose = require("mongoose");

const saleschema = new mongoose.Schema({
    customer_name : {type:String, required : true},
    add : {type:String},
    mob : {type:String},
    gst : {type:String},
    invoice : {type:Number},
    date : {type:Date},
    product_name : {type:Array, required : true},
    product_height : {type:Array},
    product_width : {type:Array},
    product_area : {type:Array},
    product_qty : {type:Array},
    product_rate : {type:Array},
    product_value : {type:Array},
    sale_total : {type:Number},    
    sale_discount : {type:Number},
    cgst : {type:Number},
    sgst : {type:Number},
    igst : {type:Number},
    sale_cgst : {type:Number},
    sale_sgst : {type:Number},
    sale_igst : {type:Number},
    sale_gsum : {type:Number},
    advance : {type:Number},
    note  : { type : String }
})

const salemodel = mongoose.model("sale", saleschema);
module.exports = salemodel; 


