const User = require("../models/user");
module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async(req,res)=>{
    try{

        let{username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        // yha pr ek function bna rhe h jo signup route jo signup ke basis pr login pr kr deta hain, mtlb jaise hi sign up ho automatic login ho jaaye.
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success" ,"Welcome to Padharo" );
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm= (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to  Padharo!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
       
        // res.redirect(req.session.redirectUrl);
        // res.redirect("/listings")
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });   // logout bhi ek passport ka method hai , jo  apne aaap me callback leta hain  as a parameter. callback mtlb jaise hi user logout ho  jaaye to immediately ky kaam hona chaiye
}