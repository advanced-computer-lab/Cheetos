const express = require("express");

const router = express.Router();

const flightController = require("../../controllers/flightController");
const middleware = require("../../controllers/middleware");

router.get("/getflights", flightController.getFlights);

router.post(
  "/createflight",
  middleware.verifyJwT,
  middleware.authorizeToken,
  flightController.createFlight
);

router.delete(
  "/deleteflight/:id",
  middleware.verifyJwT,
  middleware.authorizeToken,
  flightController.deleteFlight
);

router.put(
  "/updateflight/:id",
  middleware.verifyJwT,
  middleware.authorizeToken,
  flightController.updateFlight
);

router.get("/getflight/:id", flightController.getFlightById);

module.exports = router;
