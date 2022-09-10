const express = require("express");
const router = express.Router();
const User = require("../models/userModel")

router.post("/login", async(req, res) =>{

    const {username, password} = req.body
    try{
        const user = await User.findOne({username, password})
        if(user){        //If user exist
            res.send(user)
        }
        
        else{
            return res.status(400).json(error)
        }
    }   catch(error) {
        return res.status(400).json(error);
    }
});

router.post("/register", async(req, res) =>{
    try{
        const user = new User(req.body)
        await user.save()
        res.send('User Registered Succesfully')
    }   catch(error) {
        return res.status(400).json(error);
    }
});

module.exports = router;