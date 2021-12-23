const Flight = require("../models/Flight");

updateFlight = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  const updatedTime = {
    _id: req.params.id,
    DepartureTime: body.DepartureTime,
    ArrivalDate: body.ArrivalDate,
    DepartureDate: body.DepartureDate,
    ArrivalTime: body.ArrivalTime,
  };

  const duration = updateTripDuration(updatedTime);
  const update = {
    $set: {
      FlightNumber: body.FlightNumber,
      DepartureTime: body.DepartureTime,
      ArrivalDate: body.ArrivalDate,
      DepartureDate: body.DepartureDate,
      ArrivalTime: body.ArrivalTime,
      "EconomySeats.AvailableSeats": body.EconomySeats,
      "BusinessSeats.AvailableSeats": body.BusinessSeats,
      "FirstClassSeats.AvailableSeats": body.FirstClassSeats,
      DepartureAirport: body.DepartureAirport,
      ArrivalAirport: body.ArrivalAirport,
      DepartureTerminal: body.DepartureTerminal,
      ArrivalTerminal: body.ArrivalTerminal,
      TripDuration: duration,
    },
  };

  await Flight.findOneAndUpdate({ _id: req.params.id }, update, { new: true })
    .then((flight) => {
      //console.log("Here: ", );
      return res.status(200).json({
        success: true,
        id: flight._id,
        data: flight,
        message: "Flight updated!",
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
        message: "Flight not updated!",
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
    .catch((err) => res.status(400).json({ error: err }));
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

updateTripDuration = (flight, res) => {
  console.log("Here", flight);
  const departure = new Date(
    flight.DepartureDate + " " + flight.DepartureTime + ":00"
  );
  const arrival = new Date(
    flight.ArrivalDate + " " + flight.ArrivalTime + ":00"
  );
  var diffMs = arrival - departure;
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); //mins
  for (let i = 0; i < diffDays; i++) {
    diffHrs = diffHrs + 24;
  }
  const duration = diffHrs + "h" + " " + diffMins + "m";
  return duration;
};

module.exports = {
  updateFlight,
  deleteFlight,
  createFlight,
  getFlights,
  getFlightById,
};
