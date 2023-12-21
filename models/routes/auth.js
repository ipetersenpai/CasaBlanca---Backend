// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("./../User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup route
router.post("/signup", async (req, res) => {
  const { fullname, email, password, employeeId, contactNo } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User({
      fullname,
      email,
      password,
      employeeId,
      contactNo,
    });

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
  const { identifier, password } = req.body;

  try {
    // Check if the user exists by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

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
        contactNo: user.contactNo,
        username: user.username,
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

// Get all employees route
router.get("/employees", async (req, res) => {
  try {
    const employees = await User.find({
      user_access: "employee",
      active_status: true,
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Update user data route
router.put("/update/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user data (excluding user_access)
    const { fullname, email, password, employeeId, contactNo } = req.body;

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;
    user.employeeId = employeeId || user.employeeId;
    user.contactNo = contactNo || user.contactNo;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Update active_status route
router.put("/deactivate/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update active_status to false
    user.active_status = false;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ msg: "User deactivated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
