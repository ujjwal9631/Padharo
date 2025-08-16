// this index.js file help to initialize the data.
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// ye code basically connection establish krne ke liye hain
const MONGO_URL = "mongodb://127.0.0.1:27017/padharo";
async function main() {
    await mongoose.connect(MONGO_URL);
}


main()
.then(() => {
       console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});



// ye code ek function hain initialize database
const initDB= async () => {
    await Listing.deleteMany({}); // ye isliye kyuki maan lo phle se koi data ho toh usko completely clean kr denge
    initData.data = initData.data.map((obj)=>({...obj,owner:'6892c1b12f6262abf978a68a'}));
    await Listing.insertMany(initData.data); // ek baar sara data delete ho gya phir data insert krege
    console.log("data was initialized");
};

initDB();
