const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  FlightNumber: {
    type: String,
    required: true,
  },
  DepartureTime: {
    type: String,
    required: true,
  },
  ArrivalTime: {
    type: String,
    required: true,
  },
  DepartureDate: {
    type: String,
    required: true,
  },

  ArrivalDate: {
    type: String,
    required: true,
  },

  EconomySeats: {
    AvailableSeats: {
      type: Number,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Seats: [
      {
        Seat: {
          type: String,
        },
        Reserved: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },

  BusinessSeats: {
    AvailableSeats: {
      type: Number,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Seats: [
      {
        Seat: {
          type: String,
        },
        Reserved: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  FirstClassSeats: {
    AvailableSeats: {
      type: Number,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Seats: [
      {
        Seat: {
          type: String,
        },
        Reserved: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },

  DepartureTerminal: {
    type: Number,
    required: true,
  },

  ArrivalTerminal: {
    type: Number,
    required: true,
  },

  DepartureAirport: {
    type: String,
    required: true,
  },

  ArrivalAirport: {
    type: String,
    required: true,
  },

  TripDuration: {
    type: String,
  },
});

FlightSchema.post("save", (flight, next) => {
   const departure = new Date(flight.DepartureDate + ' ' + flight.DepartureTime + ':00')
   const arrival = new Date(flight.ArrivalDate + ' ' + flight.ArrivalTime + ':00')
   var diffMs = (arrival - departure);
   var diffDays = Math.floor(diffMs / 86400000); // days
   var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
   var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); //mins
   for(let i = 0;i<diffDays;i++){
     diffHrs = diffHrs + 24
   }
   Flight.findOneAndUpdate({_id: flight._id}, {TripDuration: diffHrs + "h" + ' ' + diffMins + 'm'}, { new: true }, (err, newflight) => {    
    if (err) {
      console.log("error");
    }
  });
next();
})
module.exports = Flight = mongoose.model("Flight", FlightSchema);
