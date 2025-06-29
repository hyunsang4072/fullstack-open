// mongodb+srv://<db_username>:<db_password>@cluster0.umz6qu2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.umz6qu2.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
});

const Phone = mongoose.model("Phone", phoneNumberSchema);

const phone = new Phone({
    name: `${name}`,
    phoneNumber: `${phoneNumber}`,
});

if (process.argv.length === 3) {
    console.log(Phone);
    Phone.find({}).then((result) => {
        console.log("first");
        result.forEach((number) => {
            console.log(number);
        });
        mongoose.connection.close();
        process.exit(0);
    });
} else {
    phone.save().then((result) => {
        console.log(`added ${name}'s phone number ${phoneNumber} to phonebook`);
        mongoose.connection.close();
    });
}
