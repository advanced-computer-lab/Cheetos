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
    type: Number,
  },
});

module.exports = Flight = mongoose.model("Flight", FlightSchema);
