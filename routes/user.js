/* This code snippet is setting up a route in a Node.js application using Express framework. */
const express = require("express");
const router = express.Router();

// here we require user model

const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController  = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));


router
    .route("/login")    
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:'/login',
        failureFlash:true
    }),
    userController.login
);

// is router se user ga data liye in sign up 
// router.get("/signup",userController.renderSignupForm);

// is router se user data exytract kiye usko database me daalna , signup process me.
// router.post("/signup",wrapAsync(userController.signup);
// );

// ye login ka router hai
// router.get("/login",userController.renderLoginForm);

// passport authentication ek middleware hain.
// router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate("local",{
//         failureRedirect:'/login',
//         failureFlash:true
//     }),
//     userController.login
// );

router.get("/logout",userController.logout);

module.exports = router;