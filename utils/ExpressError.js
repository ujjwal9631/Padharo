class ExpressError extends Error{
    constructor(statusCode , message){
    super();
    this.statusCode=statusCode;
    this.message = message;

    }
}
module.exports = ExpressError;

// isse custom message de skte hain
// isko bhi require kr lenge app.js me
