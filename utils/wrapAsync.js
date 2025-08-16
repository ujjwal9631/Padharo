module.exports=(fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}

// function wrapAsync ko hta ke directly module.exports likh diye phir arrow function likh diye
// phir is function ko app.js me require krege
// phir hr route me wrapAsync function  ko use krege baar baar try catch likhne jarurat nhi hain
