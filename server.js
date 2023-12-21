const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./models/routes/auth");
const bookingRoutes = require("./models/routes/booking"); // Add this line

const app = express();
const PORT = process.env.PORT || 3522;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://ipeter:yhJCIYHqxOlTLnky@cluster0.ypmyhny.mongodb.net/casa-blanca?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Include auth routes
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
