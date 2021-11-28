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