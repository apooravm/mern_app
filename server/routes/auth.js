const router = require('express').Router();
const User = require('../models/User'); // Importing the User Schema
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken');

// Jsonwebtoken => send a token to the client after login
// Thus for each crud operation, just need to verify the webtoken
// User login setup

// Create user
// Register User
// Requires: username(unique), password, email(unique), phone, address
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // Hash the password instead of saving directly to db
        password: cryptoJS.AES.encrypt(req.body.password, process.env.USER_PASSWORD_HASH).toString(),
        // req.body.phone ? req.body.phone : null,
        phone: req.body.phone,
        address: {
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            country: req.body.address.country,
        }
    });

    // newUser created with User schema but not been updated/saved  

    // .save => async method, thus needs async in when calling router.post()
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err) {
        const checkUser = await User.findOne({ username: req.body.username });
        if (checkUser) {
            // 409 => Conflict user already exists
            res.status(409).json("User Already Exists");
        } else {
            console.log(err)
            res.status(500).json(err);
            // console.log(err);
        }
    }
})

// Login takes in username and password only
router.post('/login', async (req, res) => {
    try {
        // find a single user
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong Username");

        const hashedPass = cryptoJS.AES.decrypt(user.password, process.env.USER_PASSWORD_HASH);
        const decoded_PASS = hashedPass.toString(cryptoJS.enc.Utf8);
        decoded_PASS !== req.body.password && res.status(401).json("Wrong Password");

        // secret jwt key is passed along with the expiry time
        // Both UserID and iSAdmin are encoded through jwt
        // This is the same data retrieved when verifying the token and decoding it
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_KEY, {expiresIn: "3d"});

        // remove the password and keep the rest from the user obj before sending back
        const { password, ...others } = user._doc;
        // Send everything but the password
        res.status(200).json({...others, accessToken});

    } catch (error) {
        // res.status(500).send(error);
    }
})


module.exports = router