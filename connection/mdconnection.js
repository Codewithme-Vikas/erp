const mongoose = require("mongoose");
require("dotenv").config();

const mdconnection = () => {

    // mongoose.connect(process.env.MONGO_URL)
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.go1g8kd.mongodb.net/erpDB`)
        .then(() => console.log("DB connected successfully!"))
        .catch((err) => {
            console.log("DB is not connected!")
            console.log(err);
            process.exit(1);
        });
}

module.exports = mdconnection;
