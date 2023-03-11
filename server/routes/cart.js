const router = require('express').Router();
const Cart = require("../models/Cart")

const { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
} = require('./verifyToken');

// Create Cart
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Cart
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        // new: true returns the updated object instead of the doc

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(err);
    }
});

// Delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Accessing the DB and deleting by ID
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get User Cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Accessing the DB and Getting a Product by ID
        const cart = await Cart.findOne({ userId: req.params.userId });

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get All Carts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router