import React, { Component } from 'react'
import Trip from '../components/Trip'
import MyHeader from '../components/MyHeader'
import Booking from '../components/Booking'

export default class Home extends Component {
    deptTrip = {
        FlightNumber: "1175",
        DepartureTime: "10:10",
        ArrivalTime: "12:10",
        DepartureDate: "2018-09-12",
        ArrivalDate: "2021-09-13",
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

    arrTrip = {
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

        DepartureAirport: "LAX",

        ArrivalAirport: "CAI",

        TripDuration: "15h 30m",
    }

    state = {
        tripArr: [[this.deptTrip, this.arrTrip],
        [this.deptTrip, this.arrTrip],
        [this.deptTrip, this.arrTrip],
        [this.deptTrip, this.arrTrip],
        ]

    }

    componentDidMount() {
        //fetch flights from backend 
        let flightArr = [1, 2, 3];
        let resultArr = [];
        for (let i = 0; i < flightArr.length; i++) {
            for (let j = 0; j < flightArr.length; j++) {
                if (flightArr[i].dept == flightArr[j].arr && flightArr[i].arr == flightArr[j].dept
                    && Date.parse(flightArr[i].arrDate) < Date.parse(flightArr[j].deptDate)) {
                    resultArr.push([flightArr[i], flightArr[j]]);
                }
            }
        }
        this.setState(
            {
                // tripArr: resultArr.filter((p) =>
                //     p[0].DepartureAirport === "" && p[0].ArrivalAirport === ""
                //     && Date.parse(p[0].DepartureDate) === Date.parse(deptDate) && Date.parse(p[1].ArrivalDate) === Date.parse(returnDate)
                //     && p[0][cabinSearchVar][seats] > adult + children
                //     && p[1][cabinSearchVar][seats] > adult + children)
            }
        )

    }

    render() {
        const { tripArr } = this.state

        return (
            <div className="flex-col" >
                <MyHeader />

                <div className="trip-search-results">

                    {tripArr.map((t) => <Trip deptFlight={t[0]} arrFlight={t[1]} />)}
                </div>
            </div>
        )
    }
}
