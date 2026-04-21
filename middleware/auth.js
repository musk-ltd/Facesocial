const jwt = require('jsonwebtoken');

// Middleware for authentication using JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from the Authorization header

    if (!token) {
        return res.sendStatus(403); // Forbidden if no token is provided
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token verification fails
        }
        req.user = user; // Save user information to request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateJWT;