const express = require('express');
const router = new express.Router();
const connection = require('../db/connection');


router.post("/create",(req,res)=>{
    // console.log(req.body);

    const {name,email,age,mobile,work,address,description}=req.body;

    if(!name || !email || !age || !mobile || !work || !address || !description){
        res.status(422).json({error:"Please fill the form properly"});
    }

    try {
        connection.query("SELECT * FROM users WHERE email=?",[email],async (error,result)=>{
            if(result.length>0){
                res.status(422).json({error:"User already exists"});
            }
            else{
                connection.query("INSERT INTO users SET ? ",{name,email,age,mobile,work,address,description},(error,result)=>{
                    if(error){
                        console.log("error"+error);
                    }
                    else{
                        res.status(201).json(req.body);
                    }
                });
            }
        })
    } catch (error) {
        res.status(500).json(error);
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

module.exports = router;