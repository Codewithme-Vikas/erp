const customermodel = require("../models/customer");
const salemodel = require("../models/sale");
const receivedmodel = require("../models/received");

const createdoc = async (req, res) => {
  try {
    const data = req.body;
    const customerdoc = new customermodel({
      name: data.name,
      add: data.add,
      mob: data.mob,
      email: data.email,
      gst: data.gst,
      pan: data.pan,
    });

    const result = await customerdoc.save();
    res.redirect("/customer");
  } catch (error) {
    console.log(error);
  }
};
const dashboard = async (req, res) => {
  res.render("index");
};
const homepage = async (req, res) => {
  try {
    const result = await customermodel.find();
    res.render("customer", { data: result });
  } catch (error) {
    console.log(error);
  }
};
const editdoc = async (req, res) => {
  try {
    const myid = req.params.id;
    const data = await customermodel.findById(myid);

    return res.render("edit", { data });
  } catch (error) {
    console.log(error);
  }
};

const updatedoc = async (req, res) => {
  try {
    // console.log(req.params.id);
    // console.log(req.body);
    const result = await customermodel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log(result);
    res.redirect("/customer");
  } catch (error) {
    console.log(error);
  }
};

const deletedoc = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await customermodel.findByIdAndDelete(id);
    console.log(data);
    res.redirect("/customer");
  } catch (error) {
    console.log(error);
  }
};

const viewtdoc = async (req, res) => {
  try {
    const result = await customermodel.find();
    res.render("customerlist", { data: result });
  } catch (error) {
    console.log(error);
  }
};

const viewreport = async (req, res) => {
  try {
    const name = req.params.name;
    const data = await salemodel.find({ customer_name: name });
    const receiveddata = await receivedmodel.find();
    res.render("customerreport", { data, receiveddata });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  homepage,
  createdoc,
  editdoc,
  updatedoc,
  deletedoc,
  dashboard,
  viewtdoc,
  viewreport,
};
