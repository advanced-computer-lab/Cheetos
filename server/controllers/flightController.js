const Flight = require("../models/Flight")

updateFlight = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Flight.findOne({id: req.params.id }, (err, flight) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Flight not found!',
            })
        }
        console.log(flight)
        if(body.number){
            flight.FlightNumber = body.number
        } 
        if(body.departure){
           flight.DepartureTime = body.departure
        } 
        if(body.arrival){
            flight.ArrivalDate = body.arrival
        }
        if(body.dDate){
            flight.DepartureDate = body.dDate
        }
        if(body.aDate){
            flight.ArrivalTime = body.aDate
        }
        
        if(body.economy){
            flight.EconomySeats = body.economy
        } 
        if(body.airport){
            flight.Airport = body.airport
        } 
       if(body.business){
           flight.BusinessSeats = body.business
       } 
       if(body.firstClass){
        flight.FirstClassSeats = body.firstClass
       }
       if(body.terminal){
        flight.Terminal = body.terminal
        }
        flight
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: flight.id,
                    message: 'Flight updated!',
                })
            }
            )
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Flight not updated!',
                })
            })
            
    })
    
}

deleteFlight = async (req, res) => {
    await Flight.findOneAndDelete({ id: req.params.id }, (err, flight) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!flight) {
            return res
                .status(404)
                .json({ success: false, error: `Flight not found` })
        }

        return res.status(200).json({ success: true, data: flight })
    }).clone()
    .catch(err => console.log(err))
}

createFlight = (req, res) => {
    Flight.create(req.body)
      .then((user) => res.json({ msg: "Flight added successfully" }))
      .catch((err) =>
        res.status(400).json({ error: "Unable to add this flight" })
      )
  }
getFlights = (req,res)=>{
        Flight.find()
          .then((flights) => res.json(flights))
          .catch((err) =>
            res.status(404).json({ noflightsfound: "No Flights found" })
          );
      }

module.exports = {
    updateFlight,
    deleteFlight,
    createFlight,
    getFlights
}
