const express = require('express');
const router = express.Router();
const User= require('../models/User');


//Create a User using: POST "api/auth/".Doesn't require Auth

router.post('/',(req,res)=>{
    // obj = {
    //     a : 'thios',
    //     number: 34
    // }
    // res.json(obj);
    
    const user= User(req.body);
    user.save();
    res.send(req.body);


    //console.log(req.body);
    //res.send('Hello World!');
})

module.exports =  router;