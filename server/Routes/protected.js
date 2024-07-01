// routes/protected.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).send('Invalid token');
    }
}

// Protected route
router.get('/', verifyToken, (req, res) => {
    // Access user information from req.user
    res.send('This is a protected route');
});

module.exports = router;
