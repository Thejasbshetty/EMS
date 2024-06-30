const express = require('express');
const router = new express.Router();
const connection = require('../db/connection');

router.post('/add-department', (req, res) => {
    const { did, dname } = req.body;

    if (!did || !dname) {
        return res.status(422).json({ error: "Please provide both department ID and name" });
    }

    const departmentData = { did, dname };

    connection.query('INSERT INTO department SET ?', departmentData, (error, result) => {
        if (error) {
            console.error("Error: " + error);
            return res.status(500).json({ error: "Database insertion error" });
        } else {
            return res.status(201).json({ message: "Department added successfully", departmentId: did });
        }
    });
});

router.get('/departments', (req, res) => {
    connection.query('SELECT * FROM department', (error, results) => {
        if (error) {
            console.error("Error: " + error);
            return res.status(500).json({ error: "Database retrieval error" });
        } else {
            return res.status(200).json(results);
        }
    });
});

router.delete('/deletedepartment/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM department WHERE did = ?', [id], (error, result) => {
        if (error) {
            console.error("Error: " + error);
            return res.status(500).json({ error: "Database deletion error" });
        } else {
            return res.status(200).json({ id });
        }
    });
});

// Route to update a department
router.put('/updatedepartment/:id', (req, res) => {
    const { id } = req.params;
    const { dname } = req.body;
    if (!dname) {
        return res.status(422).json({ error: "Please fill all fields" });
    }
    connection.query('UPDATE department SET dname = ? WHERE did = ?', [dname, id], (error, result) => {
        if (error) {
            console.error("Error: " + error);
            return res.status(500).json({ error: "Database update error" });
        } else {
            return res.status(200).json({ id, dname });
        }
    });
});

module.exports = router;