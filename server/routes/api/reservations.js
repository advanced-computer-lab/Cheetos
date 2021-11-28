const express = require("express");

const router = express.Router();

const reservationController = require('../../controllers/reservationController')

const Reservation = require("../../models/Flight");

router.get("/getreservations", reservationController.getResevations)

router.delete("/deletereservation/:id",reservationsController.deleteReservation)

router.post("/createreservation",flightController.createReservation)


module.exports = router;