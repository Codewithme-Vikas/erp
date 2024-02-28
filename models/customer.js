const mongoose = require("mongoose");

const customerschema = new mongoose.Schema({
    name : {type:String, required : true},
    add : {type:String, required : true},
    mob : {type:Number, required : true},
    email : {type:String},
    gst : {type:String,},
    pan : {type:String,}
})

const customermodel = mongoose.model("customer", customerschema);
module.exports = customermodel; 