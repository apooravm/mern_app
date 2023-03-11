const router = require('express').Router();
const Product = require("../models/Product")

const { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
} = require('./verifyToken');

// Create Product
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
    console.log(newProduct);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Product
// index -> user -> verifyToken for any change in info
// User registers -> Logins -> gets token -> 
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        // index -> user -> verify token -> create req.user -> auth token
        // Accessing the DB and updating the attributes by ID
        // req.body contains {username: "mon"}
        const updatedProduct = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        // new: true returns the updated object instead of the doc

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(err);
    }
});

// Delete Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Accessing the DB and deleting by ID
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product Deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get Product
// Anyone can GET products, thus no verification needed
router.get("/find/:id", async (req, res) => {
    try {
        // Accessing the DB and Getting a Product by ID
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get All Products
// No verification needed
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category
    try {
        // Accessing the DB and Getting all users
        // filter the users according to the query
        // if query new == true
        // return the 5 most recent users
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (qCategory)
        {
            // if qCategory in the category array of the prod, fetch the prod
            products = await Product.find({ 
                category: {
                    $in: [qCategory]
                } 
            });
        } else {
            // return all products
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router