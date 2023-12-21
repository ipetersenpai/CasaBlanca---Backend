// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("./../User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup route
router.post("/signup", async (req, res) => {
  const { fullname, email, password, employeeId } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User({ fullname, email, password, employeeId });

    // Save the user to the database
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create and send JWT token
    const payload = {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        employeeId: user.employeeId,
        user_access: user.user_access,
      },
    };

    jwt.sign(payload, "your-secret-key", { expiresIn: "3h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
