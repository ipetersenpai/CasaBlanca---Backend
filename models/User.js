// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  user_access: {
    type: String,
    default: "employee", // Set default value to "employee"
  },
  active_status: {
    type: Boolean,
    default: true,
  },
});

// Hash the password before saving it to the database
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
