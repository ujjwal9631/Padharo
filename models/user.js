const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }

});

userSchema.plugin(passportLocalMongoose); // yha plug in isliye use kiye kyuki ye by default username , hashing , salting generate kr dega

module.exports = mongoose.model("User",userSchema);