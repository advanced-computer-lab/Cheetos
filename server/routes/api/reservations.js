const express = require("express");

const router = express.Router();

const reservationController = require('../../controllers/reservationController')


router.get("/getreservation/:id", reservationController.getReservationById)

router.delete("/deletereservation/:id",reservationController.deleteReservation)

router.post("/createreservation",reservationController.createReservation)

router.put("/updatereservationseat/:id",reservationController.updateReservationSeat)

router.put("/updatereservationflight/:id",reservationController.updateReservationFlight)

router.get("/sendmailpay/:id", reservationController.sendReservationDetailsP)

router.get("/sendmailall/:id", reservationController.sendReservationDetailsAll)

module.exports = router;