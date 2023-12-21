// routes/booking.js
const express = require("express");
const router = express.Router();
const Booking = require("./../Booking");

// Booking form route
router.post("/submit", async (req, res) => {
  const {
    fullname,
    email,
    contactNo,
    reservationDate,
    roomType,
    table,
    numberOfPersons,
    purpose,
  } = req.body;

  try {
    // Create a new booking
    const booking = new Booking({
      fullname,
      email,
      contactNo,
      reservationDate,
      roomType,
      table,
      numberOfPersons,
      purpose,
      approve: false,
    });

    // Save the booking to the database
    await booking.save();

    res.status(201).json({ msg: "Booking submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
