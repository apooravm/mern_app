const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    // authToken provided in the request header
    if (authHeader) {
        // Split "bearer" from the token, bearer was added in the params
        const token = authHeader.split(" ")[1]
        // verify the provided token
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                res.status(403).json("Token Not Valid!");
            } else {
                // If everything Okay, assign user to request
                // like req.body, req.header we have created a req.user
                // The user is from the encoded user using jwt.sign() in auth.js
                // Both UserID and isAdmin json is encoded and converted into a token
                // Which is now decoded back into a user
                req.user = user;
                // next breaks from the function and returns back to the caller/router
                next();
            }
        });
    } else {
        return res.status(401).json("You are not Authenticated!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json({message: "You are not allowed to do that!"})
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json({message: "You are not allowed to do that!"})
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }