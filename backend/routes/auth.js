const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser=require('../middleware/fetchuser')

const JWT_SECRET = "Arham@2$0$0$3";
//ROUTE 1-create a user using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "must have atleast 2 characters").isLength({ min: 2 }),
    body("email", "must be a vaild email").isEmail(),
    body("password", "must have atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether user with same email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry, user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken }); // or res.json(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

/*
router.post(
  "/createuser",
  [
    body("name", "must have atleast 2 characters").isLength({ min: 2 }),
    body("email", "must be a vaild email").isEmail(),
    body("password", "must have atleast 5 characters").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ error: "please enter unique email", message: err.message });
      });
  }
);
*/

//ROUTE 2-authenticate a User using: POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "must be a vaild email").isEmail(),
    body("password", "must have atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "wrong email or password entered" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "wrong email or password entered" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//ROUTE 3- Get logged in User details using POST "/api/auth/getuser". Login Required
router.post("/getuser",fetchuser,async (req, res) => {

    try {
      userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user)
    } 
    catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);
module.exports = router;
