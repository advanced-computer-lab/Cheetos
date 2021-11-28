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
    type: Object,
    required: true,
  },

  BusinessSeats: {
    type: Object,
    required: true,
  },

  FirstClassSeats: {
    type: Object,
    required: true,
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

module.exports = Flight = mongoose.model("flight", FlightSchema);
