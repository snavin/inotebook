const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser")

var JWT_SECRET = "Naavinis@goo7body";

//ROUTE 1: Create a User using: POST "api/auth/createuser".No Login required

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success= false;
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
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, errors: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      seqPassword = await bcrypt.hash(req.body.password, salt);

      //create a new user
      //seqPassword = req.body.password;

      user = await User.create({
        name: req.body.name,
        password: seqPassword, //req.body.password,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //console.log(jwtData);
      success=true
      res.json({success,authToken});
      
      //.then(user => res.json(user))
    } catch (error) {
      console.log(error.message);
      res.status(500).json({success, errors: "some error occured" });
    }
    //.catch(err)=>{console.log(err)

    // res.json({error: 'Please enter unique value for email',message: err.message})
    //  });
    //res.json({"nice":"nice"});
  }
);

//ROUTE 2: Authenticate a User using: POST "api/auth/login".No Login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success= false;
    //if there are any errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, errors: "Enter valid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        
        return res
          .status(400)
          .json({ success, errors: "Enter valid credentials along with Password" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      success=true
      res.json({success,authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errors: "some error occured" });
    }
  }
);

//ROUTE 3: Get logged in User Details: POST "api/auth/getuser".Login required

router.post("/getuser",fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: "some error occured" });
  }
});

module.exports = router;
