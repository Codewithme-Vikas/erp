const productmodel = require("../models/product");
const salemodel = require("../models/sale");

const homepage = async (req, res) => {
    try {
        const result = await productmodel.find();
        res.render("product", {data : result});    
    } catch (error) {
        console.log(error);
    }

}

const createdoc = async (req, res) =>{
    try {            
        const data = req.body;
        console.log(data);
        const productdoc = new productmodel({
            stockname : data.stockname,
            unit : data.unit,
            qty : data.qty,
            rate : data.rate,
            value : data.value,
            cgst : data.cgst,
            sgst : data.sgst,
            igst : data.igst
        })              
        const result = await productdoc.save();            
        res.redirect("/product");
        
    } catch (error) {
        console.log(error);
    }
}
const editdoc = async (req, res) => {
    try {
        const myid = req.params.id ;
    const data = await productmodel.findById(myid);
    res.render('editproduct', {data});    
        
    } catch (error) {
        console.log(error);
    }    
}

const updatedoc = async (req, res) => {
    try {        
    const result = await productmodel.findByIdAndUpdate(req.params.id, req.body);
    console.log(result);
    res.redirect("/product"); 
        
    } catch (error) {
        console.log(error);
    }    
}

const deletedoc = async (req, res) => {
    try {
    const id = req.params.id;    
    const data = await productmodel.findByIdAndDelete(id);
    console.log(data);
    res.redirect("/product");
        
    } catch (error) {
        console.log(error);
    }    
}

const viewdoc = async (req, res) => {
    try {
        const result = await productmodel.find();
        const saledata = await salemodel.find()
        res.render("productlist", {data : result, saledata});    
    } catch (error) {
        console.log(error);
    }
}

module.exports = {homepage, createdoc, editdoc, updatedoc, deletedoc, viewdoc}