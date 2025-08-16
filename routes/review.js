const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema,reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");

const Listing = require("../models/listing.js");


const {
    validateReview,
    isLoggedIn,
    isReviewAuthor,
}= require("../middleware.js");

const reviewController = require("../controllers/review.js");
const review = require("../models/review.js");




//Reviews Route
// ab reviews ke andr post route create kr rhe hain
// Q-- why async -- because review ko database ke andr store kraye ge isliye async operation hoga.
// "Post Route" question why u only create post route in review listing but you create show route , index route for listing because review is acess via listing only  thats why we create only post route for review.
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

/// delete Review Route 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router;

// common part nikalo aur app.js me use kro 
// common part hain listings/:id/reviews
