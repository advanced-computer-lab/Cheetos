const express = require("express");

const router = express.Router();

const flightController = require("../../controllers/flightController");

const Flight = require("../../models/Flight");

router.get("/getflights", flightController.getFlights);

router.get("/getflight/:id", flightController.getFlightById);

router.post("/createflight", flightController.createFlight);

router.delete("/deleteflight/:id", flightController.deleteFlight);

router.put("/updateflight/:id", flightController.updateFlight);

module.exports = router;
