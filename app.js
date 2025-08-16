if (process.env.NODE_ENV != "production"){

    require('dotenv').config();
}
// console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js"); , transfer // listing ko require krne ke liye 
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// const wrapAsync = require("./utils/wrapAsync.js"); transfer
const ExpressError = require("./utils/ExpressError.js");
// const {listingSchema,reviewSchema} = require("./schema.js"); transfer,/// ye joi schema jo schema.js me bnae the usko require kiye
//yha humlog review model ko require krege
// const Review = require("./models/review.js"); transfer
// ye restructuring wala class ka hain.

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash"); // part2(C)
const passport = require("passport");   // part2(d)
const LocalStrategy = require("passport-local");   // part2(d)
const user = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/padharo";

const dburl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dburl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


// use mongostore
const store = MongoStore.create({
    mongoUrl: dburl,
    crypto:{
     secret: process.env.SECRET,
    },
    touchAfter:  24*3600,
})

store.on("error",()=>{
  console.log("Error in MONGO SESSION STORE",err);
});
const sessionOptions = {
    store,
    secret: "mysupersecretcode",
    resave:  false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000 ,  // is syntax ka mtlb kitna din cookies persist kregi  suppose humlog facebook page login kiye toh kb tk usko cokies rememeber keta h

        maxAge: 7*24*60*60*1000 ,
        httpOnly: true
    },
};
// app.get("/", (req,res) => {
//     res.send("Hi, I am root");
// });


// to use session
app.use(session(sessionOptions));

// create a middleware to use flash
app.use(flash());
app.use(passport.initialize()); // this middleware initialize the passport,har ek request ke liye passport initilize ho jayegaf 
app.use(passport.session());   // ye isliye kyuki baar baar login n krne pare jb koi user page to page move kr rha ho same browser par
app.use((req,res,next)=>{
    res.locals.success= req.flash("success"); // agr koi bhi sucess wala msg aata to wo response ke andr locals ke andr save ho jayega
    res.locals.error   = req.flash("error");
    res.locals.currUser = req.user;
    next(); // note next ko call krna nhi bhulna
});

// use of middleware for passport
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());  // user ke session data store krna 
passport.deserializeUser(user.deserializeUser());  // serilization ka ulta 

app.use("/listings",listingRouter);

app.use("/listings/:id/reviews",reviewRouter);

app.use("/", userRouter); // Add this line



//this is basically testing of new user 
// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new user({
//         email:"student@gmail.com",
//         username:"delta-student"
//     });
//     let registeredUser = await user.register(fakeUser,"helloWorld");
//     res.send(registeredUser);
// });


// Created a sample url where we are simply adding all the documents and test it
// app.get("/testListing" , async(req,res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

// basically yha express error throw ho raha hain.
app.all("*",(req,res,next)=>{ // ye code isliye kyuki use koi random/ jo route exist nhi krte  route pr request bhejta h toh ye message jaaye , ye bhi custom express error ka part hain
    next(new ExpressError(404,"Page Not Found"));
});

/// this is defining middleware
/// yha express error catch ho rha hain
app.use((err,req,res,next)=>{
    let{statusCode = 500, message="Something Went wrong"} = err; // this is deconstruct of the express error
    // res.render("error");
    res.status(statusCode).render("error", {err});

    // res.send("Something Went Wrong!")   // naive -- ye code error handling kr rha hain , as a middleware aur isko require krege with help of requite upr me uske andr try catch daalenge , aur agr Asyncwrap use krege toh try catch ka jarurat nhi pdhta hain
    //res.status(statusCode).send(message);
});

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () =>{
//     console.log("server is listening to port 8080");
// });
const PORT = process.env.PORT || 3000;  // <-- changed from 8080 to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// step to use flash
// 1) app.js ke andr flash ko use kiye.
// 2  phir app.js ke andr middle ware define kr liye 
//   3) listing ke andr jaake request se msg flash kr diye.
// aur flash msg ko index.js ke andr jaake print kra rhe hain