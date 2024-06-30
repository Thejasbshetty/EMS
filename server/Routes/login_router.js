const express = require('express');
const router = new express.Router();
const connection = require('../db/connection');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Login route
router.post('/login', (req, res) => {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Query to get the user by user_name
    const query = 'SELECT * FROM login WHERE name = ?';

    connection.query(query, [user_name], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const user = results[0];

        bcrypt.compare(password, user_name.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!isMatch) {
                return res.status(401).send('Invalid credentials');
            }

            res.status(200).send('Login successful');
        });
    });
});

module.exports = router;