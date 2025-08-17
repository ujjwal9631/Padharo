const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const cartController = require("../controllers/cart.js");

router.get("/", isLoggedIn, wrapAsync(cartController.showCart));
router.post("/book", isLoggedIn, wrapAsync(cartController.bookNow));
router.post("/:id", isLoggedIn, wrapAsync(cartController.addToCart));
router.delete("/:id", isLoggedIn, wrapAsync(cartController.removeFromCart));

module.exports = router;