import React, { Component } from 'react'
import Trip from '../components/Trip'
import MyHeader from '../components/MyHeader'
import Booking from '../components/Booking'

export default class Home extends Component {
    trip = {
        FlightNumber: "1919",
        DepartureTime: "08:10",
        ArrivalTime: "09:10",
        DepartureDate: "2018-10-25",
        ArrivalDate: "2021-10-26",
        EconomySeats: {
            AvailableSeats: 20,
            Price: 10,
            Seats: [
                {
                    Seat: "A1",
                    Reserved: true,
                }, {
                    Seat: "A1",
                    Reserved: true,
                },
                {
                    Seat: "A1",
                    Reserved: true,
                }],
        },

        BusinessSeats: {
            AvailableSeats: 20,
            Price: 10,
            Seats: [
                {
                    Seat: "A1",
                    Reserved: true,
                }, {
                    Seat: "A1",
                    Reserved: true,
                },
                {
                    Seat: "A1",
                    Reserved: true,
                }],
        },
        FirstClassSeats: {
            AvailableSeats: 20,
            Price: 10,
            Seats: [
                {
                    Seat: "A1",
                    Reserved: true,
                }, {
                    Seat: "A1",
                    Reserved: true,
                },
                {
                    Seat: "A1",
                    Reserved: true,
                }],
        },

        DepartureTerminal: 10,

        ArrivalTerminal: 15,

        DepartureAirport: "CAI",

        ArrivalAirport: "LAX",

        TripDuration: "24h 30m",
    }


    state = {
        tripArr: [this.trip, this.trip, this.trip]

    }



render() {
    const { tripArr } = this.state

    return (
        <div className="flex-col" >
            <MyHeader />
            <div className="trip-search-results">

                <Trip />
                <Trip />
                <Trip />
                <Trip />
                <Trip />
                <Trip />

            </div>
        </div>
    )
}
}
