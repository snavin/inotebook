const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var JWT_SECRET = "Naavinis@goo7body";

//Create a User using: POST "api/auth/createuser".No Login required

router.post(
  "/createuser",
  [
    body("name","Enter a valid name").isLength({ min: 5 }),
    body("email","Enter a valid email").isEmail(),
    body("password","Password must be atleast 5 characters").isLength({ min: 5 }),
  ],
 async (req, res) => {
    // obj = {
    //     a : 'thios',
    //     number: 34
    // }
    // res.json(obj);
   
    //   const user = User(req.body);
    //   user.save();
    //   res.send(req.body);

    //console.log(req.body);
    //res.send('Hello World!');


    //if there are any errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email exists already
    try
    {
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({errors: "User already exists"});
      }
      const salt = await bcrypt.genSalt(10);
      seqPassword = await bcrypt.hash(req.body.password,salt)

      //create a new user
      //seqPassword = req.body.password;
      
        
        
        user = await User.create({
          name: req.body.name,
          password: seqPassword,//req.body.password,
          email: req.body.email
        })

        const data={
          user:{
            id:user.id
          }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        //console.log(jwtData);
        res.json(authToken)
        //.then(user => res.json(user))
    }
    catch(error){
      console.log(error.message);
      res.status(500).json({errors: "some error occured"});
    }
    //.catch(err)=>{console.log(err)
      
      // res.json({error: 'Please enter unique value for email',message: err.message})
    //  });
    //res.json({"nice":"nice"});
  }
);

module.exports = router;
