// routes/booking.js
const express = require("express");
const router = express.Router();
const Booking = require("./../Booking");

// Booking form route
router.post("/submit", async (req, res) => {
  try {
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

// Get all bookings with status "approve: false" route
router.get("/pending", async (req, res) => {
  try {
    const pendingBookings = await Booking.find({ approve: false });
    res.status(200).json(pendingBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Update the approve status to true route
router.put("/approve/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Find the booking by ID and update the approve status to true
    await Booking.findByIdAndUpdate(bookingId, { approve: true });

    res.status(200).json({ msg: "Booking approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
