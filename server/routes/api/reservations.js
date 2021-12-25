const express = require("express");

const router = express.Router();

const reservationController = require("../../controllers/reservationController");
const middleware = require("../../controllers/middleware");

//Existing User
router.get(
  "/getreservation/:id",
  middleware.verifyJwT,
  reservationController.getReservationById
);

router.delete(
  "/deletereservation/:id",
  middleware.verifyJwT,
  reservationController.deleteReservation
);

router.post(
  "/createreservation",
  middleware.verifyJwT,
  reservationController.createReservation
);

router.put(
  "/updatereservationseat/:id",
  middleware.verifyJwT,
  reservationController.updateReservationSeat
);

router.put(
  "/updatereservationflight/:id",
  middleware.verifyJwT,
  reservationController.updateReservationFlight
);

router.post(
  "/sendmailpay/:id",
  middleware.verifyJwT,
  reservationController.sendReservationDetailsP
);

router.post(
  "/sendmailall/:id",
  middleware.verifyJwT,
  reservationController.sendReservationDetailsAll
);

module.exports = router;
