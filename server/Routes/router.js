const express = require('express');
const router = new express.Router();
const connection = require('../db/connection');


router.post("/create", (req, res) => {
    // Extract fields from request body
    const { name, email, age, mobile, work, address, description, dept_id, salary } = req.body;

    // Check if any field is missing
    if (!name || !email || !age || !mobile || !work || !address || !description || !salary || !dept_id) {
        return res.status(422).json({ error: "Please fill the form properly" });
    }

    try {
        // Check if a user with the provided email already exists
        connection.query("SELECT * FROM users WHERE email = ?", [email], async (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Database query error" });
            }

            if (result.length > 0) {
                return res.status(422).json({ error: "User already exists" });
            } else {
                // Insert the new user into the database
                const userData = { name, email, age, mobile, work, address, description, salary, dept_id };
                connection.query("INSERT INTO users SET ?", userData, (error, result) => {
                    if (error) {
                        console.log("Error: " + error);
                        return res.status(500).json({ error: "Database insertion error" });
                    } else {
                        return res.status(201).json(req.body);
                    }
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});


// getusers detail

router.get("/getusers",(req,res)=>{
    connection.query("SELECT * FROM users",(error,result)=>{
        if(error){
            res.status(422).json({error:"No data found"});
        }
        else{
            res.status(201).json(result);
        }
    });
});

// user delete

router.delete("/deleteuser/:id",(req,res)=>{
    const id=req.params.id;
    connection.query("DELETE FROM users WHERE id=?",[id],(error,result)=>{
        if(error){
            res.status(422).json({error:"User not found"});
        }
        else{
            res.status(201).json(result);
        }
    });
});

// individual user detail

router.get("/induser/:id",(req,res)=>{
    const id=req.params.id;
    connection.query("SELECT * FROM users WHERE id=?",[id],(error,result)=>{
        if(error){
            res.status(422).json({error:"User not found"});
        }
        else{
            res.status(201).json(result);
        }
    });
});

// user update

router.patch("/updateuser/:id",(req,res)=>{
    const id=req.params.id;
    const data=req.body;
    connection.query("UPDATE users SET ? WHERE id=?",[data,id],(error,result)=>{
        if(error){
            res.status(422).json({error:"User not found"});
        }
        else{
            res.status(201).json(result);
        }
    });
});

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

module.exports = router;