const Reservation = require("../models/Reservation");
const Flight = require("../models/Flight");
const nodemailer = require("nodemailer");

deleteReservation = async (req, res) => {
  await Reservation.findByIdAndDelete(
    { _id: req.params.id },
    (err, reservation) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!reservation) {
        return res
          .status(404)
          .json({ success: false, error: `Reservation not found` });
      }

      return res.status(200).json({ success: true, data: reservation });
    }
  ).catch((err) => console.log(err));
};

getReservationById = (req, res) => {
  Reservation.find({ UserId: req.params.id }, (err, reservation) => {
    console.log(reservation);
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, error: "Reservation not found" });
    }
    return res.status(200).json({ success: true, data: reservation });
  })
    .populate({
      path: "Reservation.FlightId",
      select: [
        "DepartureTime",
        "ArrivalTime",
        "DepartureDate",
        "ArrivalDate",
        "DepartureAirport",
        "DepartureTermnal",
        "ArrivalAirport",
        "ArrivalTerminal",
        "TripDuration",
      ],
    })
    .catch((err) => console.log(err));
};

updateReservationFlight = (req, res) => {
  const reservationId = req.params.id;
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  Reservation.findOne({ _id: req.params.id }).then((reservation) => {
    var filterOld = {};
    var filterDec = { _id: body.OldFlightId };
    var updateDec = {};
    var updateOld = {};
    switch (body.OldCabinClass) {
      case "Economy":
        filterOld = {
          _id: body.OldFlightId,
          "EconomySeats.Seats.Seat": body.OldChosenSeat,
        };
        updateOld = { $set: { "EconomySeats.Seats.$.Reserved": false } };
        updateDec = { $inc: { "EconomySeats.AvailableSeats": 1 } };
        break;
      case "Business":
        filterOld = {
          _id: body.OldFlightId,
          "BusinessSeats.Seats.Seat": body.OldChosenSeat,
        };
        updateOld = { $set: { "BusinessSeats.Seats.$.Reserved": false } };
        updateDec = { $inc: { "BusinessSeats.AvailableSeats": 1 } };
        break;
      case "FirstClass":
        filterOld = {
          _id: body.OldFlightId,
          "FirstClassSeats.Seats.Seat": body.OldChosenSeat,
        };
        updateOld = { $set: { "FirstClassSeats.Seats.$.Reserved": false } };
        updateDec = { $inc: { "FirstClassSeats.AvailableSeats": 1 } };
        break;
    }
    Flight.findOneAndUpdate(
      filterDec,
      updateDec,
      { new: true },
      (err, flight) => {
        if (err) {
          console.log("error");
        }
      }
    );
    Flight.findOneAndUpdate(
      filterOld,
      updateOld,
      { new: true },
      (err, flight) => {
        if (err) {
          console.log("error");
        }
      }
    );
    var filterNew = {};
    var filterInc = { _id: body.NewFlightId };
    var updateInc = {};
    var updateNew = {};
    switch (body.NewCabinClass) {
      case "Economy":
        filterNew = {
          _id: body.NewFlightId,
          "EconomySeats.Seats.Seat": body.NewChosenSeat,
        };
        updateNew = { $set: { "EconomySeats.Seats.$.Reserved": true } };
        updateInc = { $inc: { "EconomySeats.AvailableSeats": -1 } };
        break;
      case "Business":
        filterNew = {
          _id: body.NewFlightId,
          "BusinessSeats.Seats.Seat": body.NewChosenSeat,
        };
        updateNew = { $set: { "BusinessSeats.Seats.$.Reserved": true } };
        updateInc = { $inc: { "BusinessSeats.AvailableSeats": -1 } };
        break;
      case "FirstClass":
        filterNew = {
          _id: body.NewFlightId,
          "FirstClassSeats.Seats.Seat": body.NewChosenSeat,
        };
        updateNew = { $set: { "FirstClassSeats.Seats.$.Reserved": true } };
        updateInc = { $inc: { "FirstClassSeats.AvailableSeats": -1 } };
        break;
    }
    Flight.findOneAndUpdate(
      filterInc,
      updateInc,
      { new: true },
      (err, flight) => {
        if (err) {
          console.log("error");
        }
      }
    );
    Flight.findOneAndUpdate(
      filterNew,
      updateNew,
      { new: true },
      (err, flight) => {
        if (err) {
          console.log("error");
        }
      }
    );
  });

  const filter = {
    _id: req.params.id,
    "Reservation.FlightId": body.OldFlightId,
    "Reservation.ChosenSeat": body.OldChosenSeat,
  };
  const update = {
    $set: {
      "Reservation.$.PassengerFirstName": body.PassengerFirstName,
      "Reservation.$.PassengerLastName": body.PassengerLastName,
      "Reservation.$.PassengerType": body.PassengerType,
      "Reservation.$.PassengerPassportNumber": body.PassengerPassportNumber,
      "Reservation.$.FlightId": body.NewFlightId,
      "Reservation.$.CabinClass": body.NewCabinClass,
      "Reservation.$.ChosenSeat": body.NewChosenSeat,
    },
  };

  Reservation.findOneAndUpdate(filter, update, { new: true })
    .then((reservation) => {
      console.log(reservation);
      console.log(reservation._id);
      return res.status(200).json({
        success: true,
        id: reservation._id,
        data: reservation,
        message: "Reservation updated!",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({
        error,
        message: "Reservation not updated!",
      });
    });
};

updateReservationSeat = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  const filterSeatArray = {
    _id: req.params.id,
    "Reservation.FlightId": body.FlightId,
    "Reservation.ChosenSeat": body.OldChosenSeat,
  };
  const updateSeatArray = {
    $set: { "Reservation.$.ChosenSeat": body.NewChosenSeat },
  };
  var filterOld = {};
  var filterNew = {};
  var updateNew = {};
  var updateOld = {};
  switch (body.CabinClass) {
    case "Economy":
      filterOld = {
        _id: body.FlightId,
        "EconomySeats.Seats.Seat": body.OldChosenSeat,
      };
      filterNew = {
        _id: body.FlightId,
        "EconomySeats.Seats.Seat": body.NewChosenSeat,
      };
      updateOld = { $set: { "EconomySeats.Seats.$.Reserved": false } };
      updateNew = { $set: { "EconomySeats.Seats.$.Reserved": true } };
      break;
    case "Business":
      filterOld = {
        _id: body.FlightId,
        "BusinessSeats.Seats.Seat": body.OldChosenSeat,
      };
      filterNew = {
        _id: body.FlightId,
        "BusinessSeats.Seats.Seat": body.NewChosenSeat,
      };
      updateOld = { $set: { "BusinessSeats.Seats.$.Reserved": false } };
      updateNew = { $set: { "BusinessSeats.Seats.$.Reserved": true } };
      break;
    case "FirstClass":
      filterOld = {
        _id: body.FlightId,
        "FirstClassSeats.Seats.Seat": body.OldChosenSeat,
      };
      filterNew = {
        _id: body.FlightId,
        "FirstClassSeats.Seats.Seat": body.NewChosenSeat,
      };
      updateOld = { $set: { "FirstClassSeats.Seats.$.Reserved": false } };
      updateNew = { $set: { "FirstClassSeats.Seats.$.Reserved": true } };
      break;
  }
  Flight.findOneAndUpdate(
    filterNew,
    updateNew,
    { new: true },
    (err, flight) => {
      if (err) {
        console.log("error");
      }
    }
  );
  Flight.findOneAndUpdate(
    filterOld,
    updateOld,
    { new: true },
    (err, flight) => {
      if (err) {
        console.log("error");
      }
    }
  );
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
      console.log(error);
      return res.status(404).json({
        error,
        message: "Reservation not updated!",
      });
    });
};

createReservation = (req, res) => {
  var reser = Reservation.create(req.body)
    .then((reservation) =>
      res.json({ msg: "Reservation added successfully", data: reservation._id })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

sendReservationDetailsP = (req, res) => {
  const body = req.body;
  const deptFlight = body.deptFlight;
  const arrFlight = body.arrFlight;

  Reservation.findOne({ _id: req.params.id }, (err, reservation) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    User.findById(reservation.UserId, " FirstName Email", (err, user) => {
      if (err) {
        console.log(err);
      } else {
        let mailTransporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: "cheetosmym1@outlook.com",
            pass: "Acltestingmail.1",
          },
        });
        let mail = "";
        for (let i = 0; i < reservation.Reservation.length / 2; i++) {
          mail =
            mail +
            "\n" +
            " <strong>Ticket Number: </strong>" +
            (i + 1) +
            "<br/>" +
            "\n" +
            " <strong>Passenger First Name: </strong> " +
            reservation.Reservation[i].PassengerFirstName +
            "<br/>" +
            "\n" +
            "\n " +
            "<strong>Passenger LastName: </strong>" +
            reservation.Reservation[i].PassengerLastName +
            "<br/>" +
            "\n " +
            "<strong>Passenger Type: </strong>" +
            reservation.Reservation[i].PassengerType +
            "<br/>" +
            "\n " +
            "<strong>Passenger PassportNumber: </strong>" +
            reservation.Reservation[i].PassengerPassportNumber +
            "<br/>" +
            "\n " +
            "<strong>Cabin Class: </strong>" +
            reservation.Reservation[i].CabinClass +
            "<br/>" +
            "\n " +
            "<strong>Chosen Seat: </strong>" +
            reservation.Reservation[i].ChosenSeat;
          mail =
            mail +
            "<br/>" +
            "\n " +
            "<strong>Departure Flight number: </strong>" +
            deptFlight.FlightNumber +
            "<br/>" +
            "\n" +
            "<strong>Departure Date: </strong>" +
            deptFlight.DepartureDate +
            "<br/>" +
            "\n" +
            "<strong>Departure Time: </strong>" +
            deptFlight.DepartureTime +
            "<br/>" +
            "\n" +
            "<strong>Arrival Date: </strong>" +
            deptFlight.ArrivalDate +
            "<br/>" +
            "\n" +
            "<strong>Arrival Time: </strong>" +
            deptFlight.ArrivalTime +
            "<br/>" +
            "\n" +
            "<strong>Departure Airport: </strong>" +
            deptFlight.DepartureAirport +
            "<br/>" +
            "\n" +
            "<strong>Arrival Airport: </strong>" +
            deptFlight.ArrivalAirport +
            "<br/>" +
            "\n" +
            "<strong>Departure Terminal: </strong>" +
            deptFlight.DepartureTerminal +
            "<br/>" +
            "\n" +
            "<strong>Arrival Terminal: </strong>" +
            deptFlight.ArrivalTerminal +
            "<br/>" +
            "\n" +
            "<strong>Departure trip Duration: </strong>" +
            deptFlight.TripDuration +
            "<br/>" +
            "<br/>" +
            "<br/>";
        }

        for (
          let i = reservation.Reservation.length / 2;
          i < reservation.Reservation.length;
          i++
        ) {
          mail =
            mail +
            "\n" +
            "<br/>" +
            "<strong>Ticket Number: </strong>" +
            (i + 1) +
            "\n" +
            "<br/>" +
            "<strong>Passenger First Name:  </strong>" +
            reservation.Reservation[i].PassengerFirstName +
            "\n" +
            "<br/>" +
            "<strong>Passenger LastName: </strong>" +
            reservation.Reservation[i].PassengerLastName +
            "\n " +
            "<br/>" +
            "<strong>Passenger Type: </strong>" +
            reservation.Reservation[i].PassengerType +
            "\n " +
            "<br/>" +
            "<strong>Passenger PassportNumber: </strong>" +
            reservation.Reservation[i].PassengerPassportNumber +
            "\n " +
            "<br/>" +
            "<strong>Cabin Class: </strong>" +
            reservation.Reservation[i].CabinClass +
            "\n " +
            "<br/>" +
            "<strong>Chosen Seat: </strong>" +
            reservation.Reservation[i].ChosenSeat +
            "<br/>" +
            "<strong>Arrival Flight number: </strong>" +
            arrFlight.FlightNumber +
            "\n" +
            "<br/>" +
            "<strong>Departure Date: </strong>" +
            arrFlight.DepartureDate +
            "\n" +
            "<br/>" +
            "<strong>Departure Time: </strong>" +
            arrFlight.DepartureTime +
            "\n" +
            "<br/>" +
            "<strong>Arrival Date: </strong>" +
            arrFlight.ArrivalDate +
            "\n" +
            "<br/>" +
            "<strong>Arrival Time: </strong>" +
            arrFlight.ArrivalTime +
            "\n" +
            "<br/>" +
            "<strong>Departure Airport: </strong>" +
            arrFlight.DepartureAirport +
            "\n" +
            "<br/>" +
            "<strong>Arrival Airport: </strong>" +
            arrFlight.ArrivalAirport +
            "\n" +
            "<br/>" +
            "<strong>Departure Terminal: </strong>" +
            arrFlight.DepartureTerminal +
            "\n" +
            "<br/>" +
            "<strong>Arrival Terminal: </strong>" +
            arrFlight.ArrivalTerminal +
            "\n" +
            "<br/>" +
            "<strong>Arrival trip Duration: </strong>" +
            arrFlight.TripDuration +
            "\n";
        }
        let mailDetails = {
          from: "cheetosmym1@outlook.com",
          to: user.Email,
          subject: "Flight Confirmation",
          //text:
          html:
            "Dear " +
            user.FirstName +
            " ," +
            "<br/>" +
            "&nbsp;&nbsp; This email serves as a notification that your reservation was booked sucessfully." +
            "with confirmation number " +
            reservation._id +
            " with the following details " +
            "<br/>" +
            "<br/>" +
            mail +
            "<br/>" +
            "<br/>" +
            "<br/>" +
            " <strong>Total Price: </strong>" +
            reservation.TotalPrice,
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log("Error Occured", err);
          } else {
            console.log("Email sent successfully");
          }
        });
      }
    });
  });
  return res.status(200).json({ success: true });
};

sendReservationDetailsAll = (req, res) => {
  Reservation.find({ UserId: req.params.id }, (err, reservation) => {
    console.log(reservation);
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, error: "Reservation not found" });
    }

    User.findById(req.params.id, " FirstName Email", (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user.Email);
        let mailTransporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: "cheetosmym1@outlook.com",
            pass: "Acltestingmail.1",
          },
        });
        console.log(user);
        let mail = "";
        console.log("wwwwwwwwwwwwwwwwwwwwww");
        console.log(reservation);
        for (let j = 0; j < reservation.length; j++) {
          mail =
            mail +
            "\n" +
            " confirmation number:  " +
            reservation[j]._id +
            "\n" +
            " total Price : " +
            reservation[j].TotalPrice;
          for (let i = 0; i < reservation[j].Reservation.length; i++) {
            mail =
              mail +
              "\n" +
              "ticket number: " +
              (i + 1) +
              "\n" +
              "Passenger First Name:  " +
              reservation[j].Reservation[i].PassengerFirstName +
              "\n " +
              "Passenger LastName : " +
              reservation[j].Reservation[i].PassengerLastName +
              // "\n "+"Flight id : "+reservation.Reservation[i].FlightId +
              "\n " +
              "Passenger Type : " +
              reservation[j].Reservation[i].PassengerType +
              "\n " +
              "Passenger PassportNumber : " +
              reservation[j].Reservation[i].PassengerPassportNumber +
              "\n " +
              "Cabin Class : " +
              reservation[j].Reservation[i].CabinClass +
              "\n " +
              "Chosen Seat :" +
              reservation[j].Reservation[i].ChosenSeat;

            mail =
              mail +
              "Departure Flight number: " +
              body.deptFlight.FlightNumber +
              "\n" +
              "Departure Date: " +
              body.deptFlight.DepartureDate +
              "\n" +
              "Departure Time: " +
              body.deptFlight.DepartureTime +
              "\n";
            "Arrival Flight number: " +
              body.arrFlight.FlightNumber +
              "\n" +
              "Arrival Date: " +
              body.arrFlight.ArrivalDate +
              "\n" +
              "Arrival Time: " +
              body.arrFlight.ArrivalTime +
              "\n" +
              "Departure Airport: " +
              body.deptFlight.DepartureAirport +
              "\n" +
              "Arrival Airpirt: " +
              body.arrFlight.ArrivalAirport +
              "\n" +
              "Departure Terminal: " +
              body.deptFlight.DepartureTerminal +
              "\n" +
              "Arrival Terminal: " +
              body.arrFlight.ArrivalTerminal +
              "\n" +
              "Departure trip Duration: " +
              body.deptFlight.TripDuration +
              "\n" +
              "\n " +
              "\n " +
              "\n ";
          }
        }
        let mailDetails = {
          from: "cheetosmym1@outlook.com",
          to: user.Email,
          subject: "Flight Confirmation",
          text:
            "Dear " +
            user.FirstName +
            "\n " +
            " , \n This email was sent upon your request these are all your bookings " +
            "\n" +
            mail,
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log("Error Occured", err);
          } else {
            console.log("Email sent successfully");
          }
        });
      }
    });
  });
  return res.status(200).json({ success: true });
};

module.exports = {
  deleteReservation,
  createReservation,
  getReservationById,
  updateReservationSeat,
  updateReservationFlight,
  sendReservationDetailsP,
  sendReservationDetailsAll,
};
