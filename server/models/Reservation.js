const mongoose = require("mongoose");
const Flight = require("./Flight");
const nodemailer = require("nodemailer");
const ReservationSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  TotalPrice: {
    type: Number,
    required: true,
  },

  Reservation: [
    {
      PassengerFirstName:{
        type: String,
        required: true,
      },

      PassengerLastName:{
        type: String,
        required: true,
      },

      PassengerType:{
        type: String,
        required: true,
      },

      PassengerPassportNumber:{
        type: String,
        required: true,
      },

      FlightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
        required: true,
      },

      CabinClass: {
        type: String,
        required: true,
      },

      ChosenSeat: {
        type: String,
        required: true,
      },

    },
  ],
});

ReservationSchema.post("save", (reservation, next) => {
  var array = reservation.Reservation;
  for (let i = 0; i < array.length; i++) {
    const filter = { _id: reservation.Reservation[i].FlightId };
    var filter2 = {};
    var update = {};
    var updateS = {};

    switch (reservation.Reservation[i].CabinClass) {
      case "Economy":
        update = { $inc: { "EconomySeats.AvailableSeats": -1 } };

        filter2 = {
          _id: reservation.Reservation[i].FlightId,
          "EconomySeats.Seats.Seat": reservation.Reservation[i].ChosenSeat,
        };
        updateS = { $set: { "EconomySeats.Seats.$.Reserved": true } };
        console.log(updateS);
        break;
      case "Business":
        update = { $inc: { "BusinessSeats.AvailableSeats": -1 } };
        filter2 = {
          _id: reservation.Reservation[i].FlightId,
          "BusinessSeats.Seats.Seat": reservation.Reservation[i].ChosenSeat,
        };
        updateS = { $set: { "BusinessSeats.Seats.$.Reserved": true } };
        break;
      case "FirstClass":
        update = { $inc: { "FirstClassSeats.AvailableSeats": -1 } };
        filter2 = {
          _id: reservation.Reservation[i].FlightId,
          "FirstClassSeats.Seats.Seat": reservation.Reservation[i].ChosenSeat,
        };
        updateS = { $set: { "FirstClassSeats.Seats.$.Reserved": true } };
        break;
    }
    Flight.findOneAndUpdate(filter, update, { new: true }, (err, flight) => {
      if (err) {
        console.log("error");
      }
    });
    Flight.findOneAndUpdate(filter2, updateS, { new: true }, (err, flight) => {
      if (err) {
        console.log("error");
      }
    });
  }
  next();
});

ReservationSchema.post("findOneAndDelete", (reservation, next) => {
  User.findById(reservation.UserId, " FirstName Email", (err, user) => {
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
      let mailDetails = {
        from: "cheetosmym1@outlook.com",
        to: user.Email,
        subject: "Cancellation Confirmation",
        text:
          "Dear " +
          user.FirstName +
          " , \n This email serves as a notification that you have cancelled your reservation." + 
          "with confirmation number " + reservation._id + 
          "\n " +
          reservation.TotalPrice +
          " dollars were refunded. ",
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
  next();
});

ReservationSchema.post("findOneAndDelete", (reservation, next) => {
  var array = reservation.Reservation;
  for (let i = 0; i < array.length; i++) {
    const filter = { _id: reservation.Reservation[i].FlightId };
    var filter2 = {};
    var update = {};
    var updateS = {};
    switch (reservation.Reservation[i].CabinClass) {
      case "Economy":
        update = { $inc: { "EconomySeats.AvailableSeats": 1 } };
        filter2 = {
          _id: reservation.Reservation[i].FlightId,
          "EconomySeats.Seats.Seat": reservation.Reservation[i].ChosenSeat,
        };
        updateS = { $set: { "EconomySeats.Seats.$.Reserved": false } };
        break;
      case "Business":
        update = { $inc: { "BusinessSeats.AvailableSeats": 1 } };
        filter2 = {
          _id: reservation.Reservation[i].FlightId,
          "BusinessSeats.Seats.Seat": reservation.Reservation[i].ChosenSeat,
        };
        updateS = { $set: { "BusinessSeats.Seats.$.Reserved": false } };
        break;
      case "FirstClass":
        update = { $inc: { "FirstClassSeats.AvailableSeats": 1 } };
        filter2 = {
          _id: reservation.Reservation[i].FlightId,
          "FirstClassSeats.Seats.Seat": reservation.Reservation[i].ChosenSeat,
        };
        updateS = { $set: { "FirstClassSeats.Seats.$.Reserved": false } };
        break;
    }
    Flight.findOneAndUpdate(filter, update, { new: true }, (err, flight) => {
      if (err) {
        console.log("error");
      }
    });
    console.log(i);
    Flight.findOneAndUpdate(filter2, updateS, { new: true }, (err, flight) => {
      if (err) {
        console.log("error");
      }
    });
  }
  next();
});

ReservationSchema.post("save", (re, next) => {
  let deptid = re.Reservation[0].FlightId;
  let a1 = [];
  a1.push(re.Reservation[0].ChosenSeat);
  console.log("a1", a1);
  let index = 1;
  for (i = 1; i < re.Reservation.length + 1; i++) {
    if (re.Reservation[i].FlightId.equals(deptid)) {
      a1.push(re.Reservation[i].ChosenSeat);
    } else {
      break;
    }
    index++;
  }
  let arrid = re.Reservation[index].FlightId;

  let a2 = [];
  a2.push(re.Reservation[index].ChosenSeat);
  for (let j = index + 1; j < re.Reservation.length; j++) {
    if (re.Reservation[j].FlightId.equals(arrid)) {
      a2.push(re.Reservation[j].ChosenSeat);
    } else {
      break;
    }
  }

  Reservation.findByIdAndUpdate(
    { _id: re._id },
    {
      $set: {
        "DepFlight.DeptSeats": a1,
        "DepFlight.Id": deptid,
      },
    },
    { new: true }
  )
    .then((newflight) => {})
    .catch((err) => res.status(400).json({ error: err }));

  Reservation.findByIdAndUpdate(
    { _id: re._id },
    {
      $set: {
        "ArrFlight.ArrSeats": a2,
        "ArrFlight.Id": arrid,
      },
    },
    { new: true }
  )
    .then((newflight) => {
      console.log(newflight);
    })
    .catch((err) => res.status(400).json({ error: err }));
  next();
});
module.exports = Reservation = mongoose.model("reservation", ReservationSchema);