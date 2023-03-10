const router = require('express').Router();
const Order = require("../models/Order");

const { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
} = require('./verifyToken');

// Create Order
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Order
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        // new: true returns the updated object instead of the doc

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(err);
    }
});

// Delete Order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Accessing the DB and deleting by ID
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order Deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get User Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Accessing the DB and Getting a O by ID
        const orders = await Order.find({ userId: req.params.userId });

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get All Orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Monthly Income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    res.status(200).send("Under Construction😴")
})

module.exports = router