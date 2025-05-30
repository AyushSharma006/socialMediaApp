const router = require("express").Router();
const User = require("../models/userMode");
const bcrypt = require("bcrypt");

// Creating a new user

router.post("/register",async (req, res) => {

  try {
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({email : req.body.email});
    if(!user) {
      return res.status(404).send("user not found");
    }

    const validPass = req.body.password;
    if(user.password != validPass) {
      return res.status(404).send("Invalid password");
    } else {
      console.log(user);
      return res.status(200).json(user);
    }

  } catch (error) {
    return res.status(500).send(error);
  }
})

module.exports = router;

