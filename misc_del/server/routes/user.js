const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const User = require("../models/User")

router.get('/usertest', (req, res) => {
    res.send(`<h1>Bru🙄</h1>`);
})

// Update User
// index -> user -> verifyToken for any change in info
// User registers -> Logins -> gets token -> 
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.API_AUTH_KEY
        ).toString();
    }

    try {
        // index -> user -> verify token -> create req.user -> auth token
        // Accessing the DB and updating the attributes by ID
        // req.body contains {username: "mon"}
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        // new: true returns the updated object instead of the doc

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(err)
    }
})

// Delete User
// takes in ID
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Accessing the DB and deleting by ID
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Profile Deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get User
// ID
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Accessing the DB and Getting a user by ID
        const user = await User.findById(req.params.id);

        const { password, ...others } = user._doc;
        // Send everything but the password
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get All Users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        // Accessing the DB and Getting all users
        // filter the users according to the query
        // if query new == true
        // return the 5 most recent users
        const users = query
            ? await User.find().sort({_id: -1}).limit(5)
            : await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get User Stats
// eg: total num of users in a certain month
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month", 
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router