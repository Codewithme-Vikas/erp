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


// ************* Customers List*******************
const viewtdoc = async (req, res) => {
    try {
        const customersDoc = await customermodel.find();

        // these are the advance aggregate queries - [not easy to understand]

        /*
            const salesDoc = await salemodel.aggregate([
            {
                $group: {
                    _id: "$customer_name",
                    totalSale: { $sum: "$sale_gsum" },
                    totalAdvance: { $sum: "$advance" },
                    add: { $first: "$add" },
                    mob: { $first: "$mob" },
                    customer_name: { $first: "$customer_name" }
                }
            },
            {
                $lookup: {
                    from: "receiveds",
                    localField: "name",
                    foreignField: "customer_name",
                    as: "receiveds"
                }
            },
            {
                $unwind: "$receiveds" // Unwind the receiveds array
            },
            {
                $match: {
                    $expr: { $eq: ["$_id", "$receiveds.name"] } // Match documents where customer name matches
                }
            },
            {
                $group: {
                    _id: "$_id", // Use _id from the previous stage
                    totalSale: { $first: "$totalSale" }, // Keep the totalSale from previous grouping
                    totalAdvance: { $first: "$totalAdvance" }, // Keep the totalAdvance from previous grouping
                    totalReceived: { $sum: "$receiveds.received" }, // Calculate totalReceived
                    add: { $first: "$add" },
                    mob: { $first: "$mob" },
                    customer_name: { $first: "$customer_name" },
                }
            }

        ]);

        const receivedsDoc = await receivedmodel.aggregate([
            {
                $group: { _id: "$name", totalReceived: { $sum: "$received" } }
            },
            {
                $lookup: {
                    from: "sales",
                    localField: "customer_name",
                    foreignField: "name",
                    as: "salesData"
                }
            },
            {
                $unwind: "$salesData"
            },
            {
                $match: {
                    $expr: { $eq: ["$_id", "$salesData.customer_name"] }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    totalReceived: { $first: "$totalReceived" }, // Keep the totalReceived from previous grouping
                    totalAdvance: { $sum: "$salesData.advance" },
                    totalSale: { $sum: "$salesData.sale_gsum" },
                    // Preserve the additional fields
                    add: { $first: "$salesData.add" },
                    mob: { $first: "$salesData.mob" },
                    customer_name: { $first: "$salesData.customer_name" }
                }
            },
        ]);
        */
        


        const salesDoc = await salemodel.aggregate([
            {
                $group: {
                    _id: "$customer_name",
                    totalSale: { $sum: "$sale_gsum" },
                    totalAdvance: { $sum: "$advance" },
                }
            }
        ]);


        const receivedsDoc = await receivedmodel.aggregate([
            {
                $group: { _id: "$name", totalReceived: { $sum: "$received" } }
            }
        ]);


        return res.render("customerlist", { data: customersDoc, salesDoc , receivedsDoc });
    } catch (error) {
        console.log(error);
    }
};
// ------------------------------------------------



const viewreport = async (req, res) => {
    try {
        const name = req.params.name;
        const data = await salemodel.find({ customer_name: name });
        const receiveddata = await receivedmodel.find({ name: name });
        return res.render("customerreport", { data, receiveddata });
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
