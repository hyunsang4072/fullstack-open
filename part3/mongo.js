// .env
require("dotenv").config();

const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//     console.log("give password as argument");
//     process.exit(1);
// }

// const name = process.argv[3];
// const phoneNumber = process.argv[4];

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
});

const Phone = mongoose.model("Phone", phoneNumberSchema);

const phone = new Phone({
    name: `Hyunsang`,
    phoneNumber: `510-123-4567`,
});

phone.save().then((result) => {
    console.log(`added ${phone.name}'s phone number ${phone.phoneNumber} to phonebook`);
    mongoose.connection.close();
});

// if (process.argv.length === 3) {
//     console.log(Phone);
//     Phone.find({}).then((result) => {
//         console.log("first");
//         result.forEach((number) => {
//             console.log(number);
//         });
//         mongoose.connection.close();
//         process.exit(0);
//     });
// } else {
//     phone.save().then((result) => {
//         console.log(`added ${name}'s phone number ${phoneNumber} to phonebook`);
//         mongoose.connection.close();
//     });
// }
