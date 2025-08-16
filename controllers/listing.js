const Listing = require("../models/listing");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({accessToken: mapToken});

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    console.log(allListings);
    res.render("listings/index.ejs", {allListings});
    
};

module.exports.renderNewForm = (req,res) => {

    res.render("listings/new.ejs")

}

module.exports.showListing = async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path:"reviews",
        populate:{path:"author",

        },
    })
    .populate("owner"); // populate isliye krte h taaki review ke object id ke sath data bhi show ho.
    // console.log(listing);
    // failure ke liye flash include krna
    if(!listing){
        req.flash("error","Listing you requested does not existed! ")
        res.redirect("/listing");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req,res,next) => {
    // let {title, description, image, price, country, location} = req.body;
    // let listing = req.body.listing;

// let result =  listingSchema.validate(req.body);
// isko validation of schema 
// console.log(result);
// if(result.error){
//     throw new ExpressError(400,result.error);
// }

    // ye tidious tha ek ek kr ke listing ko validata krna ab hum schema.js ke andr joi ko daal ke aap.js me accquire kr liye hain toh ab isko comment kr denge

        // if(!req.body.listings){
        //     throw new ExpressError(400,"Send valid data for listings");
        // }
        
        // const newListings = new Listing(req.body.listing);
        // if(!newListings.title){
        //     throw new ExpressError(400," Title is missing");
        // }
        // if(!newListings.description){
        //     throw new ExpressError(400,"Description is missing");
        // }
        // if(!newListings.location){
        //     throw new ExpressError(400,"Location is missing");
        // }

        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location,
                limit: 1,
            })
            .send();
            // (response.body.feature[0].geometry);
            // res.send("done!");

        let url = req.file.path;
        let filename = req.file.filename;
        // console.log(url,"..",filename);
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url,filename};
        newListing.geometry =  response.body.features[0].geometry;
        let savedListing = await newListing.save();
        console.log(savedListing);
        await newListing.save();
        
        req.flash("success","New Listing Created!");// phase -2(C)
        
        res.redirect("/listings");
        // console.log(listing);  
    
}

module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you requested does not existed! ")
        res.redirect("/listing");
    }
    res.render("listings/edit.ejs", {listing});
}

module.exports.updateListing = async(req,res) =>{
    // if(!req.body.listings){
    //         throw new ExpressError(400,"Send valid data for listings");
    //     } // ab ye likhne ki jarurat nhi h khud se. automatically ho jayega, due to middleware bna liye h validation of schema.
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !=="undefined"){

        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}