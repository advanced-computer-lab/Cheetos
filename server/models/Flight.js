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
    PriceAdult: {
      type: Number,
      required: true,
    },
    PriceChild: {
      type: Number,
    },
    BaggageAllowance: {
      Number: {
        type: Number,
      },
      Size: {
        type: String,
      },
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
    PriceAdult: {
      type: Number,
      required: true,
    },
    PriceChild: {
      type: Number,
    },
    BaggageAllowance: {
      Number: {
        type: Number,
      },
      Size: {
        type: String,
      },
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
    PriceAdult: {
      type: Number,
      required: true,
    },
    PriceChild: {
      type: Number,
    },
    BaggageAllowance: {
      Number: {
        type: Number,
      },
      Size: {
        type: String,
      },
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
FlightSchema.post("save", (flight, next) => {
  let PriceAFC = flight.FirstClassSeats.PriceAdult;
  const update = {
    $set: { "FirstClassSeats.PriceChild": PriceAFC * (8 / 10) },
  };
  //FirstClass
  Flight.findByIdAndUpdate({ _id: flight._id }, update, { new: true })
    .then((newflight) => {})
    .catch((err) => res.status(400).json({ error: err }));

  //BusinessClass
  let PriceABC = flight.BusinessSeats.PriceAdult;
  const updateB = {
    $set: { "BusinessSeats.PriceChild": PriceABC * (8 / 10) },
  };
  Flight.findByIdAndUpdate({ _id: flight._id }, updateB, { new: true })
    .then((newflight) => {})
    .catch((err) => res.status(400).json({ error: err }));

  //EconomyClass
  let PriceAEC = flight.EconomySeats.PriceAdult;
  const updateE = {
    $set: { "EconomySeats.PriceChild": PriceAEC * (8 / 10) },
  };
  Flight.findByIdAndUpdate({ _id: flight._id }, updateE, { new: true })
    .then((newflight) => {})
    .catch((err) => res.status(400).json({ error: err }));
  next();
});

FlightSchema.post("save", (flight, next) => {
  //FirstClass
  //get length firstclass
  let seats = flight.FirstClassSeats.AvailableSeats;
  let condition = seats / 4 + 1;
  let array = [];
  let rows = 1;
  let index = 0;
  for (i = 1; i < condition; i++) {
    for (let j = 0; j < 4 && index < seats; j++) {
      var letter = String.fromCharCode(65 + j);
      array.push({ Seat: letter + i, Reserved: false });
      index++;
    }
    rows = i + 1;
  }
  Flight.findByIdAndUpdate(
    { _id: flight._id },
    {
      $set: {
        "FirstClassSeats.Seats": array,
      },
    },
    { new: true }
  )
    .then((newflight) => {})
    .catch((err) => res.status(400).json({ error: err }));
  //BusinessClass
  //get length Businessclass
  let Bseats = flight.BusinessSeats.AvailableSeats;
  condition = Bseats / 4 + rows;
  array = [];
  index = 0;
  for (let i = rows; i < condition; i++) {
    for (let j = 0; j < 4 && index < Bseats; j++) {
      var letter = String.fromCharCode(65 + j);
      array.push({ Seat: letter + i, Reserved: false });
      index++;
    }
    rows = i + 1;
  }
  Flight.findByIdAndUpdate(
    { _id: flight._id },
    {
      $set: {
        "BusinessSeats.Seats": array,
      },
    },
    { new: true }
  )
    .then((newflight) => {})
    .catch((err) => res.status(400).json({ error: err }));

  //Economy
  //get length Economyclass
  let Eseats = flight.EconomySeats.AvailableSeats;
  condition = rows + Eseats / 4;
  array = [];
  index = 0;
  for (i = rows; i < condition; i++) {
    for (let j = 0; j < 4 && index < Eseats; j++) {
      var letter = String.fromCharCode(65 + j);
      array.push({ Seat: letter + i, Reserved: false });
      index++;
    }
  }
  Flight.findByIdAndUpdate(
    { _id: flight._id },
    {
      $set: {
        "EconomySeats.Seats": array,
      },
    },
    { new: true }
  )
    .then((newflight) => {})
    .catch((err) => res.status(400).json({ error: err }));
  next();
});

FlightSchema.post("save", (flight, next) => {
  const departure = new Date(
    flight.DepartureDate + " " + flight.DepartureTime + ":00"
  );
  const arrival = new Date(
    flight.ArrivalDate + " " + flight.ArrivalTime + ":00"
  );
  var diffMs = departure - arrival;
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); //mins
  next();
});

FlightSchema.post("save", (fl, next) => {
  const filter = { _id: fl._id };
  const update = {
    $set: {
      "EconomySeats.BaggageAllowance": { Number: 2, Size: "25Kgs" },
      "FirstClassSeats.BaggageAllowance": { Number: 3, Size: "30Kgs" },
      "BusinessSeats.BaggageAllowance": { Number: 4, Size: "35Kgs" },
    },
  };
  Flight.findOneAndUpdate(filter, update, { new: true }, (err, flight) => {
    if (err) {
      console.log(err);
    }
  });

  next();
});

module.exports = Flight = mongoose.model("Flight", FlightSchema);
