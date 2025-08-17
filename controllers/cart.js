const Cart = require("../models/cart");
const Listing = require("../models/listing");
const User = require("../models/user");

module.exports.showCart = async (req, res) => {
    const cart = await Cart.findOne({ owner: req.user._id }).populate({
        path: "items.listing"
    });
    res.render("cart/index.ejs", { cart });
};

module.exports.addToCart = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    let cart = await Cart.findOne({ owner: req.user._id });

    if (!cart) {
        cart = new Cart({ owner: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.listing.equals(listing._id));

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
    } else {
        cart.items.push({ listing: listing._id, quantity: 1 });
    }

    await cart.save();
    req.flash("success", `${listing.title} added to cart!`);
    res.redirect(`/listings/${id}`);
};

module.exports.removeFromCart = async (req, res) => {
    const { id } = req.params;
    const cart = await Cart.findOne({ owner: req.user._id });
    const itemIndex = cart.items.findIndex(item => item.listing.equals(id));

    if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        await cart.save();
        req.flash("success", "Item removed from cart.");
    }

    res.redirect("/cart");
};

module.exports.bookNow = async (req, res) => {
    // This is where you would integrate a payment gateway.
    // For a real-world application, you would use a service like Stripe or Razorpay.
    
    // Example with a placeholder for a payment gateway:
    try {
        const cart = await Cart.findOne({ owner: req.user._id });
        if (!cart || cart.items.length === 0) {
            req.flash("error", "Your cart is empty.");
            return res.redirect("/cart");
        }

        let totalPrice = cart.items.reduce((sum, item) => sum + item.listing.price * item.quantity, 0);

        // Here you would call the payment gateway API to create a payment intent.
        // For example, with Stripe, you would do something like this:
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: totalPrice * 100, // Amount in cents
        //     currency: 'inr',
        //     automatic_payment_methods: {
        //         enabled: true,
        //     },
        // });

        // For now, we'll simulate a successful booking.
        req.flash("success", `Your booking has been confirmed! Total amount: &#8377;${totalPrice.toLocaleString("en-IN")}.`);
        
        // Clear the cart after a successful booking.
        cart.items = [];
        await cart.save();
        
        res.redirect("/listings");

    } catch (e) {
        req.flash("error", "An error occurred during booking. Please try again.");
        res.redirect("/cart");
    }
};