const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const flightRoutes = require("./routes/api/flights");
const userRoutes = require("./routes/api/users");
const reservationRoutes = require("./routes/api/reservations");

<<<<<<< HEAD
const flightRoutes = require("./routes/api/flights");
const userRoutes = require("./routes/api/users");
const reservationRoutes = require("./routes/api/reservations");

connectDB()
=======
connectDB();
>>>>>>> b7354b25413185b5e92c7b704fb821b9f3860823
app.use("/api/flight", flightRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reservation", reservationRoutes);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
