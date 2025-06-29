// .env
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// mongoDB
// const password = process.argv[2];
// const url = process.env.MONGODB_URI;
const url = "MONGODB_API_KEY";

mongoose
    .connect(url)
    .then((result) => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
});

phoneNumberSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Phone", phoneNumberSchema);
