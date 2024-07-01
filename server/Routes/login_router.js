const express = require('express');
const router = new express.Router();
const connection = require('../db/connection');
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
router.use(bodyParser.json());

// Login route
router.post('/login', async (req, res) => {
    const { user_name, password } = req.body;

    // Validate request
    if (!user_name || !password) {
        console.log('Username or password missing');
        return res.status(400).send('Username and password are required');
    }

    try {
        // Query to get the user by user_name
        const query = 'SELECT * FROM login WHERE user_name = ?';
        const [results] = await connection.promise().query(query, [user_name]);

        if (results.length === 0) {
            console.log(`No user found with username: ${user_name}`);
            return res.status(401).send('Invalid credentials');
        }

        const user = results[0];

        // Compare plain text password
        if (password !== user.password) {
            console.log('Password mismatch');
            return res.status(401).send('Invalid credentials');
        }

        console.log('Login successful');
        res.status(200).send('Login successful');
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
