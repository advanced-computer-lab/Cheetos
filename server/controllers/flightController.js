const Flight = require("../models/Flight");

updateFlight = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Flight.findOne({ _id: req.params.id }, (err, flight) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Flight not found!",
      });
    }
    console.log(flight);

    flight.FlightNumber = body.FlightNumber;

    flight.DepartureTime = body.DepartureTime;

    flight.ArrivalDate = body.ArrivalDate;

    flight.DepartureDate = body.DepartureDate;

    flight.ArrivalTime = body.ArrivalTime;

    flight.EconomySeats = body.EconomySeats;

    flight.DepartureAirport = body.DepartureAirport;

    flight.ArrivalAirport = body.ArrivalAirport;

    flight.BusinessSeats = body.BusinessSeats;

    flight.FirstClassSeats = body.FirstClassSeats;

    flight.DepartureTerminal = body.DepartureTerminal;

    flight.ArrivalTerminal = body.ArrivalTerminal;

    flight
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: flight.id,
          message: "Flight updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Flight not updated!",
        });
      });
  });
};

deleteFlight = async (req, res) => {
  await Flight.findByIdAndDelete({ _id: req.params.id }, (err, flight) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!flight) {
      return res
        .status(404)
        .json({ success: false, error: `Flight not found` });
    }

    return res.status(200).json({ success: true, data: flight });
  }).catch((err) => console.log(err));
};

createFlight = (req, res) => {
  Flight.create(req.body)
    .then((user) =>
      res.json({ msg: "Flight added successfully", data: req.body })
    )
    .catch((err) =>
      res.status(400).json({ error: err})
    );
};

getFlights = (req, res) => {
  Flight.find()
    .then((flights) => res.json(flights))
    .catch((err) =>
      res.status(404).json({ noflightsfound: "No Flights found" })
    );
};

getFlightById = async (req, res) => {
  await Flight.findOne({ _id: req.params.id }, (err, flight) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!flight) {
      return res
        .status(404)
        .json({ success: false, error: "Flight not found" });
    }
    return res.status(200).json({ success: true, data: flight });
  }).catch((err) => console.log(err));
};

module.exports = {
  updateFlight,
  deleteFlight,
  createFlight,
  getFlights,
  getFlightById,
};
