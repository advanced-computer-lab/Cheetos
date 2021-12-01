const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const ReservationSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  Reservation: [
    {
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

      Passenger: {
        type: String,
        required: true,
      },

      Price: {
        type: Number,
        required: true,
      },

      BaggageAllowance: {
        type: Number,
        required: true,
      },
    },
  ],
});

ReservationSchema.post("save", (doc, next) => {
  const filter = { _id: doc.Reservation[0].FlightId };
  const update = { $inc: { "EconomySeats.AvailableSeats": -1 } };
  console.log(doc.Reservation[0].FlightId);
  //const update = { FlightNumber: 5 };
  Flight.findOneAndUpdate(filter, update, { new: true }, (err, newdoc) => {
    if (err) {
      console.log("error");
    }
  });
  next();
});

ReservationSchema.post("findOneAndDelete", (reservation, next) => {
  User.findById(reservation.UserId, "Email", (err, user) => {
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
      let mailDetails = {
        from: "cheetosmym1@outlook.com",
        to: user.Email,
        subject: "cancellation confirmation",
        text: "Dear Customer  your reservation was cancelled dollar was refunded ",
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

module.exports = Reservation = mongoose.model("Reservation", ReservationSchema);
