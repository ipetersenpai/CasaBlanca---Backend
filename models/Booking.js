// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  roomType: {
    type: Number,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
  numberOfPersons: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  approve: {
    type: Boolean,
    default: false,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
