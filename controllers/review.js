const Listing = require("../models/listing");
const Review = require("../models/review");
module.exports.createReview = async(req,res)=>{
    
     /// 1)  ab review ko add krne ke liye hum ab listing ko acess kr lete hain jiski id diye hue hain
    let listing = await Listing.findById(req.params.id);
    // 2) ab new review create krna hain, aur jo review button uske sumbit krege toh backend ke andr pass hogi uske ko phir new review ke andr store kre lenge
    let newReview = new Review(req.body.review);
    
    newReview.author = req.user._id;

    // 3) jo show.ejs me reviews array uske ke andr newReview ko push kr denge jo listing.js me hain 

    listing.reviews.push(newReview);

    //) ab dono ko database ke andr save kr denge
    await newReview.save();
    // kyuki ki agr existing database me kuch change jrna hota hai toh .save() ko call krna pdta hain aur .save() khud me asynchonous function hain.


    await listing.save();
    req.flash("success","New Review created!");

    // console.log("new review saved");
    // res.send("new review saved");

    res.redirect(`/listings/${listing._id}`); // iska fayda ye h ki agr review sumbit kiye koi hotel ka toh tum usi page pr rahoge
}

module.exports.destroyReview = async(req,res)=>{
    let{id,reviewId} = req.params;
    
    // ab listing ke review Array ke andr bhi jaake delete krna hoga

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}) /// iske parenthesis me mongo ka special operator use krege jisko khte mongo pull operator

    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
    }