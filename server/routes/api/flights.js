const express = require("express");

const router = express.Router();

const flightController = require('../../controllers/flightController')

const Flight = require("../../models/Flight");

router.get("/", flightController.getFlights)

router.post("/create",flightController.createFlight )

router.delete("/delete",flightController.deleteFlight )

router.put('/update',flightController.updateFlight)

module.exports = router;
