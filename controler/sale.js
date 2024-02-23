const productmodel = require("../models/product");
const customermodel = require("../models/customer");
const salemodel = require("../models/sale");

const homepage = async (req, res) => {
  try {
    const product = await productmodel.find();
    const customer = await customermodel.find();
    const sale = await salemodel.find({}).countDocuments();
    const salecount = sale + 1;
    res.render("sale", {
      productdata: product,
      customerdata: customer,
      salecount: salecount,
    });
  } catch (error) {
    console.log(error);
  }
};

const createdoc = async (req, res) => {
  try {
    const data = req.body;

    const saledoc = new salemodel({
      customer_name: data.customer_name,
      add: data.add,
      mob: data.mob,
      gst: data.gst,
      invoice: data.sale_invoice,
      date: new Date(),
      product_name: data.product_name,
      product_height: data.product_height,
      product_width: data.product_width,
      product_area: data.product_area,
      product_qty: data.product_qty,
      product_rate: data.product_rate,
      product_value: data.product_value,
      sale_total: data.sale_total,
      sale_discount: data.sale_discount,
      cgst: data.cgst,
      sgst: data.sgst,
      igst: data.igst,
      sale_cgst: data.sale_cgst,
      sale_sgst: data.sale_sgst,
      sale_igst: data.sale_igst,
      sale_gsum: data.sale_gsum,
      advance: data.advance,
      note: data.note,
    });

    const result = await saledoc.save();

    return res.redirect(`/printsale/${result._id}`);

  } catch (error) {
    console.log(error);
  }
};

const salereport = async (req, res) => {
  try {
    const sale = await salemodel.find({});

    return res.render("salereport", { saledata: sale });
  } catch (error) {
    console.log(error);
  }
};


const editdoc = async (req, res) => {
  try {
    const myid = req.params.id;
    const data = await salemodel.findById(myid);
    const product = await productmodel.find();
    const customer = await customermodel.find();
    res.render("editsale", {
      data,
      productdata: product,
      customerdata: customer,
    });
  } catch (error) {
    console.log(error);
  }
};

const updatedoc = async (req, res) => {
  try {
    const data = req.body;


    const result = await salemodel.findByIdAndUpdate(req.params.id, {
      customer_name: data.customer_name,
      add: data.add,
      mob: data.mob,
      gst: data.gst,
      product_name: data.product_name,
      product_height: data.product_height,
      product_width: data.product_width,
      product_area: data.product_area,
      product_qty: data.product_qty,
      product_rate: data.product_rate,
      product_value: data.product_value,
      sale_total: data.sale_total,
      sale_discount: data.sale_discount,
      cgst: data.cgst,
      sgst: data.sgst,
      igst: data.igst,
      sale_cgst: data.sale_cgst,
      sale_sgst: data.sale_sgst,
      sale_igst: data.sale_igst,
      sale_gsum: data.sale_gsum,
      advance: data.advance,
      note: data.note,
    });

    return res.redirect("/salereport");
  } catch (error) {
    console.log(error);
  }
};

const printsale = async (req, res) => {
  try {
    const myid = req.params.id;
    const data = await salemodel.findById(myid);
    const customerdata = await customermodel.find();
    // const product = await productmodel.find();
    // const customer = await customermodel.find();
    res.render("printsale", { data, customerdata });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  homepage,
  createdoc,
  salereport,
  editdoc,
  updatedoc,
  printsale,
};
