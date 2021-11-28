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

  getReservationById = async (req, res) => {
    await Reservation.findOne({ _id: req.params.id }, (err, reservation) => {
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
    .populate('Reservation.FlightId')
    .catch((err) => console.log(err));
  };

    //getReservationDetails = async(req, res) => {

    //}

  createReservation = (req, res) => {
    Reservation.create(req.body)
      .then((user) =>
        res.json({ msg: "Reservation added successfully", data: req.body })
      )
      .catch((err) =>
        res.status(400).json({ error: "Unable to add this reservation" })
      );
  };

  module.exports = {
    deleteReservation,
    createReservation,
    getReservations,
  };