const mongoose = require("mongoose");
const Flight = require("./Flight");
 const ReservationSchema = new mongoose.Schema({
     UserId : {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User',
         required: true,
     },

     TotalPrice: {
         type: Number,
         required: true
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
    var array = reservation.Reservation
     for( let i = 0;i<array.length;i++){
    const filter = { _id: reservation.Reservation[i].FlightId };
    var filter2 = {}
    var update = {};
    var updateS = {};
    switch(reservation.Reservation[i].CabinClass){
        case 'Economy':
            console.log('shit')
            update = { $inc: { "EconomySeats.AvailableSeats": -1 } };
            filter2 = { _id: reservation.Reservation[i].FlightId , "EconomySeats.Seats.Seat":  reservation.Reservation[i].ChosenSeat};
            updateS = { "$set": { "EconomySeats.Seats.$.Reserved": true}};
            break;
        case 'Business':
             update = { $inc: { "BusinessSeats.AvailableSeats": -1 } };            
             filter2 = { _id: reservation.Reservation[i].FlightId , "BusinessSeats.Seats.Seat":  reservation.Reservation[i].ChosenSeat};
             updateS = { "$set": { "BusinessSeats.Seats.$.Reserved": true}};
            break;
        case 'FirstClass': 
            update = { $inc: { "FirstClassSeats.AvailableSeats": -1 } };
            filter2 = { _id: reservation.Reservation[i].FlightId , "FirstClassSeats.Seats.Seat":  reservation.Reservation[i].ChosenSeat};
            updateS = { "$set": { "FirstClassSeats.Seats.$.Reserved": true}};
            break;
    }
    Flight.findOneAndUpdate(filter, update, { new: true }, (err, flight) => {
      if (err) {
        console.log("error");
      }
    });
    console.log(i)
    Flight.findOneAndUpdate(filter2, updateS, { new: true }, (err, flight) => {
        
      if (err) {
        console.log("error");
      }
    });
 }
    next();
    
  });

  ReservationSchema.post("findOneAndDelete", (reservation, next) => {
    var array = reservation.Reservation
    for( let i = 0;i<array.length;i++){
   const filter = { _id: reservation.Reservation[i].FlightId };
   var filter2 = {}
   var update = {};
   var updateS = {};
   switch(reservation.Reservation[i].CabinClass){
       case 'Economy':
           console.log('shit')
           update = { $inc: { "EconomySeats.AvailableSeats": 1 } };
           filter2 = { _id: reservation.Reservation[i].FlightId , "EconomySeats.Seats.Seat":  reservation.Reservation[i].ChosenSeat};
           updateS = { "$set": { "EconomySeats.Seats.$.Reserved": false}};
           break;
       case 'Business':
            update = { $inc: { "BusinessSeats.AvailableSeats": 1 } };            
            filter2 = { _id: reservation.Reservation[i].FlightId , "BusinessSeats.Seats.Seat":  reservation.Reservation[i].ChosenSeat};
            updateS = { "$set": { "BusinessSeats.Seats.$.Reserved": false}};
           break;
       case 'FirstClass': 
           update = { $inc: { "FirstClassSeats.AvailableSeats": 1 } };
           filter2 = { _id: reservation.Reservation[i].FlightId , "FirstClassSeats.Seats.Seat":  reservation.Reservation[i].ChosenSeat};
           updateS = { "$set": { "FirstClassSeats.Seats.$.Reserved": false}};
           break;
   }
   Flight.findOneAndUpdate(filter, update, { new: true }, (err, flight) => {
     if (err) {
       console.log("error");
     }
   });
   console.log(i)
   Flight.findOneAndUpdate(filter2, updateS, { new: true }, (err, flight) => {
       
     if (err) {
       console.log("error");
     }
   });
}
   next();
  });
 module.exports = Reservation = mongoose.model("reservation", ReservationSchema);