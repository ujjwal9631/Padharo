const mongoose = require("mongoose");
const Schema = mongoose.Schema;   // Schema is variable

// yha review model use krna padega -- topic deleting listing , listing delete ho gya review bach gya
// require review

const Review = require("./review.js");



// this is listing schema
const listingSchema = new mongoose.Schema({  //gpt
    title : {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url:String,
        filename:String,
        // type: String  //gpt
        //default: "https://www.istockphoto.com/photo/sunset-over-indian-ocean-gm508130698-85073221?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fsunset&utm_medium=affiliate&utm_source=unsplash&utm_term=sunset%3A%3Avideo-affiliates%3Acontrol", // this is use when image option is not given
        //set : (v) => v ===""? "https://www.istockphoto.com/photo/sunset-over-indian-ocean-gm508130698-85073221?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fsunset&utm_medium=affiliate&utm_source=unsplash&utm_term=sunset%3A%3Avideo-affiliates%3Acontrol" : v, // this condition is basically for client purpose
    },
    price: Number,
    location: String,
    country: String,
    // yha pr ek baar dekh lena how one to many relationship work , kaise listing ke andr reviwe model work kr rha hain
    reviews:[{

        type: Schema.Types.ObjectId,
        ref: "Review"
    }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type:{
            type: String,
            enum:['Point'],
            required: true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    }
});
// topic name - Deleting Listing
// Agr maan lo hum listing delete krte hain toh review jo us listing ko diye the wo jata hain toh dono chiz delete hona chaiye uska code
// this is mongoose middleware.
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){

        await Review.deleteMany({ _id:{$in:listing.reviews}});
    }
});

// Using this we will create a model
const Listing = mongoose.model("Listing", listingSchema);

// Exporting this model(Listing) in our app.js
module.exports = Listing;
