import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import Booking from '../components/Booking'

export default class MyBookings extends Component {
    state={
        bookingsArr : [
            {_id : "A12344",
            UserId :"",
            Reservation:[
            {FlightId:1223,
            CabinClass : "Economy",
            ChosenSeat:"A1",
            Passenger: "",
            Price:700,
            BaggageAllowance:3,
            },
        
            {
            FlightId:1223,
            CabinClass : "Economy",
            ChosenSeat:"A1",
            Passenger: "",
            Price:700,
            BaggageAllowance:3,} ]},

            {_id : "A12344",
            UserId :"",
            Reservation:[{FlightId:1223,
            CabinClass : "Economy",
            ChosenSeat:"A1",
            Passenger: "",
            Price:700,
            BaggageAllowance:3,
            },
        
            {
            FlightId:1223,
            CabinClass : "Economy",
            ChosenSeat:"A1",
            Passenger: "",
            Price:700,
            BaggageAllowance:3,} ]}
        ],
        }
            
    render() {

        const {bookingsArr} = this.state

        return (
            <div className="flex-col">
                <MyHeader/>
                <div className="trip-search-results">
                {
                bookingsArr.map((b) => (
                  <Booking confirmationNum = {b.A12344_id} userId = {b.UserId} reservation = {b.Reservation}
                  />
                ))}
                </div>
            </div>
        )
    }
}
