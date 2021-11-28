const mongoose = require("mongoose");
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
        },
        
        CabinClass: {
            type: String,
        },

        ChosenSeat: {
            type: String,
        },

        Passenger: {
            type: char,
        },

        Price: {
            type: Number,
        },

        BaggageAllowance: {
            type: Number,
        }
     }]

 })