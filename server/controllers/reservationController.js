const Reservation = require("../models/Reservation");
const Flight = require("../models/Flight");

deleteReservation = async (req, res) => {
    await Reservation.findByIdAndDelete({ _id: req.params.id }, (err, reservation) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
  
      if (!reservation) {
        return res
          .status(404)
          .json({ success: false, error: `Reservation not found` });
      }
  
      return res.status(200).json({ success: true, data: reservation});
    }).catch((err) => console.log(err));
  };

  getReservationById = (req, res) => {
     Reservation.find({UserId: req.params.id }, (err, reservation) =>{
        console.log(reservation);
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
  
      if (!reservation) {
        return res
          .status(404)
          .json({ success: false, error: "Reservation not found" });
      }
      return res.status(200).json({ success: true, data: reservation});
    })
    .populate({path: 'Reservation.FlightId', select:['DepartureTime', 'ArrivalTime', 'DepartureDate', 'ArrivalDate','DepartureAirport', 'DepartureTermnal', 'ArrivalAirport', 'ArrivalTerminal', 'TripDuration']})
    .catch((err) => console.log(err));
  };

  //updateReservationFlight = 

  updateReservationSeat = (req, res) => {
    const body = req.body;
    var flag = false;
  
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }
     var type = body.FlightType
     var filterSeatArrays = {}
     var updateSeatArrays = {}
     const filterSeatArray = {_id: req.params.id, "Reservation.FlightId": body.FlightId, "Reservation.ChosenSeat": body.OldChosenSeat }
     const updateSeatArray = {$set:{"Reservation.$.ChosenSeat": body.NewChosenSeat}}
     Reservation.findOne({_id: req.params.id}).then((reservation) => {
      var array = reservation.Reservation;
      for (let i = 0; i < array.length; i++) {
        const filter = { _id: reservation.Reservation[i].FlightId };
        var filterOld = {}
        var filterNew = {};
        var updateNew = {};
        var updateOld = {};
        switch (reservation.Reservation[i].CabinClass) {
          case "Economy":
            filterOld = {_id: reservation.Reservation[i].FlightId, "EconomySeats.Seats.Seat": body.OldChosenSeat};
            filterNew = {_id: reservation.Reservation[i].FlightId, "EconomySeats.Seats.Seat": body.NewChosenSeat};
            updateOld = {$set: { "EconomySeats.Seats.$.Reserved": false }}
            updateNew = {$set: { "EconomySeats.Seats.$.Reserved": true }};
            break;
          case "Business":
            filterOld = {_id: reservation.Reservation[i].FlightId, "BusinessSeats.Seats.Seat": body.OldChosenSeat};
            filterNew = {_id: reservation.Reservation[i].FlightId, "BusinessSeats.Seats.Seat": body.NewChosenSeat};
            updateOld = {$set: { "BusinessSeats.Seats.$.Reserved": false }}
            updateNew = {$set: { "BusinessSeats.Seats.$.Reserved": true }};
            break;
          case "FirstClass":
            filterOld = {_id: reservation.Reservation[i].FlightId, "FirstClassSeats.Seats.Seat": body.OldChosenSeat};
            filterNew = {_id: reservation.Reservation[i].FlightId, "FirstClassSeats.Seats.Seat": body.NewChosenSeat};
            updateOld = {$set: { "FirstClassSeats.Seats.$.Reserved": false }}
            updateNew = {$set: { "FirstClassSeats.Seats.$.Reserved": true }};
            break;
        }
        Flight.findOneAndUpdate(filterNew, updateNew, { new: true }, (err, flight) => {
          if (err) {
            console.log("error");
          }
        });
        Flight.findOneAndUpdate(filterOld, updateOld, { new: true }, (err, flight) => {
          if (err) {
            console.log("error");
          }
        });
      }
    });
    Reservation.findOneAndUpdate(filterSeatArray, updateSeatArray, { new: true })
      .then((reservation) => {
        return res.status(200).json({
          success: true,
          id: reservation._id,
          data: reservation,
          message: "Reservation updated!",
        });
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json({
          error,
          message: "Reservation not updated!",
        });
      });
  };
   
 createReservation = (req, res) => {
   var reser =  Reservation.create(req.body)
      .then((reservation) =>
        res.json({ msg: "Reservation added successfully", data: reservation._id })
      )
      .catch((err) =>
        res.status(400).json({ error: err})
      );
  };

  module.exports = {
    deleteReservation,
    createReservation,
    getReservationById,
    updateReservationSeat,
  };