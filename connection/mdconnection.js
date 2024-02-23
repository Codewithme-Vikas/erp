const mongoose = require("mongoose");
require("dotenv").config();

const mdconnection = () =>mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.go1g8kd.mongodb.net/erpDB`)
.then(() => console.log("connection successfully"))
.catch((err) => console.log(err))

module.exports = mdconnection;