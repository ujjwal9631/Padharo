const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js")

const listingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
// const upload = multer({dest: 'uploads/'});
router
.route("/")
.get( wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    //gpt
    (req, res, next) => {
        if (req.file) {
            req.body.listing.image = req.file.path; // Cloudinary URL
        }
        next();
    },
    validateListing, 
    wrapAsync(listingController.createListing)
);
// .post( upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file);
// });

router.get("/new",isLoggedIn, listingController.renderNewForm);

router
.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete( isLoggedIn, isOwner,
     wrapAsync(listingController.destroyListing));


// Index Route  // sb routes se listings hatao 
// router.get("/", wrapAsync(listingController.index));
// New Route

// Show Route
// router.get("/:id", wrapAsync(listingController.showListing));


// Create route
// step -3 ,how to validate listing, passed as middleware in app.post
// router.post("/",
//     validateListing, 
//     isLoggedIn,
//      wrapAsync(listingController.createListing)
// );
//Edit Route
router.get("/:id/edit",
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.renderEditForm));

// Update route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//      wrapAsync(listingController.updateListing)
// );
// Delete Route
// router.delete("/:id", isLoggedIn, isOwner,
//      wrapAsync(listingController.destroyListing));

module.exports = router;