const mongoose = require("mongoose");
const Flight = require("./Flight");
 const ReservationSchema = new mongoose.Schema({
     UserId : {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User',
         required: true,
     },

     Reservation: [{
        FlightId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Flight',
            required: true
        },
        
        CabinClass: {
            type: String,
            required: true
        },

        ChosenSeat: {
            type: String,
            required: true
        },

        Passenger: {
            type: String,
            required: true
        },

        Price: {
            type: Number,
            required: true
        },

        BaggageAllowance: {
            type: Number,
            required: true
        }
     }]

 })

 ReservationSchema.post("save", (reservation, next) => {
     for( i = 0;i<reservation.Reservation.length;i++){
    const filter = { _id: reservation.Reservation[i].FlightId };
    switch(reservation.Reservation[i].CabinClass){
        case 'Economy':
            const update = { $inc: { "EconomySeats.AvailableSeats": -1 } };
            break;
        case 'Business':
            const update = { $inc: { "BusinessSeats.AvailableSeats": -1 } };
            break;
        case 'FirstClass': 
            const update = { $inc: { "FirstClassSeats.AvailableSeats": -1 } };
            break;
    }
    Flight.findOneAndUpdate(filter, update, { new: true }, (err, flight) => {
      if (err) {
        console.log("error");
      }
      for( i = 0;i<reservation.Reservation.length;i++){
        const filter = { _id: reservation.Reservation[i].FlightId };
      const updateSeats;
      switch(reservation.Reservation[i].CabinClass){
        case 'Economy':
            for(j = 0;j<flight.EconomySeats.Seats.length;j++){
                if(flight.EconomySeats.Seats[j].Seat.equals(reservation.Reservation.ChosenSeat)){
                     updateSeats = {EconomySeats.Seats[j].Reserved: true};
                }
            };
            break;
        case 'Business':
            for(j = 0;j<flight.BusinessSeats.Seats.length;j++){
                if(flight.BusinessSeats.Seats[j].Seat.equals(reservation.Reservation.ChosenSeat)){
                     updateSeats = {flight.BusinessSeats.Seats[j].Reserved: true};
                }
            };
            break;
        case 'FirstClass': 
             for(j = 0;j<flight.FirstClassSeats.Seats.length;j++){
                if(flight.FirstClassSeats.Seats[j].Seat.equals(reservation.Reservation.ChosenSeat)){
                     updateSeats = {flight.FirstClassSeats.Seats[j].Reserved: true};
            }
        };
         break;
      }
      Flight.findOneAndUpdate(filter, updateSeats, { new: true }, (err, flightseats) => {
        if (err) {
          console.log("error");
        }
    })
    }
  
    });
    next();
    }
  });
 module.exports = Reservation = mongoose.model("reservation", ReservationSchema);