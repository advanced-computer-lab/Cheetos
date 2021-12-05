import React, { Component } from 'react'
import Trip from '../components/Trip'
import MyHeader from '../components/MyHeader'
import Booking from '../components/Booking'
import api from '../api'
import { withRouter } from 'react-router'
class Home extends Component {
    deptTrip = {
        FlightNumber: "1175",
        DepartureTime: "10:10",
        ArrivalTime: "12:10",
        DepartureDate: "2021-09-12",
        ArrivalDate: "2021-09-13",
        EconomySeats: {
            AvailableSeats: 20,
            PriceAdult: 1000,
            PriceChild: 700,
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
            PriceAdult: 1500,
            PriceChild: 850,
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
            PriceAdult: 2000,
            PriceChild: 700,
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
        BaggageAllowance: {
            Number: 4,
            Size: 20
        }
    }

    arrTrip = {
        FlightNumber: "1919",
        DepartureTime: "08:10",
        ArrivalTime: "09:10",
        DepartureDate: "2021-10-25",
        ArrivalDate: "2021-10-26",
        EconomySeats: {
            AvailableSeats: 20,
            PriceAdult: 1000,
            PriceChild: 700,
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
            PriceAdult: 1500,
            PriceChild: 850,
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
            PriceAdult: 2000,
            PriceChild: 700,
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
        BaggageAllowance: {
            Number: 2,
            Size: 25
        }

    }

    state = {
        // all flights fetched from backend
        // flightArr : [this.deptTrip , this.arrTrip , this.arrTrip , this.deptTrip] ,  
        flightArr: [],
        userId: "",
        //array containing pairs of dept and arrival flights i.e round trip ,computed at search
        // tripArr: [[this.deptTrip, this.arrTrip],
        // [this.deptTrip, this.arrTrip],
        // [this.deptTrip, this.arrTrip],
        // [this.deptTrip, this.arrTrip],
        // ]
        tripArr: [],



    }

    async componentDidMount() {

        await api.getAllFlights().then(flights => {
            console.log(flights)
            this.setState({
                flightArr: flights.data,

            })
        }).then(
            () => {
                const searchObject = JSON.parse(sessionStorage.getItem('searchQuery'))
                if (searchObject) {
                   
                    this.handleSearch( searchObject.adultCount, searchObject.childCount, searchObject.deptAirport,searchObject.arrAirport, searchObject.deptDate, searchObject.retDate, searchObject.deptCabinClass, searchObject.arrCabinClass)
                }
            }
        )

        console.log(this.state.flightArr);
        // sessionStorage.setItem('userId', "61ab9713fe61452296d667ca");
        console.log("my user id is ", localStorage.getItem('userId'))
    }


    deptCabin = ''
    arrCabin = ''
    adultCount = 0
    childCount = 0
    handleSearch(adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, deptCabinClass, arrCabinClass) {
        //----making the pairs of flights (round trips) from the all flights array 
        this.deptCabin = deptCabinClass;
        this.arrCabin = arrCabinClass;
        this.adultCount = adultCount;
        this.childCount = childCount;
        const { flightArr } = this.state;
        let resultArr = []; //temporary array to hold all "pairs" of possible round trips
        for (let i = 0; i < flightArr.length; i++) {
            for (let j = 0; j < flightArr.length; j++) {
                if (flightArr[i].DepartureAirport === flightArr[j].ArrivalAirport && flightArr[i].ArrivalAirport === flightArr[j].DepartureAirport
                    && Date.parse(flightArr[i].ArrivalDate) < Date.parse(flightArr[j].DepartureDate)) {
                    //pushing results to the result array consisting of pairs 
                    resultArr.push([flightArr[i], flightArr[j]]);
                }
            }
        }
        console.log(resultArr);
        // ----handling the filtering of all possible pairs to show search results according do user input 
        this.setState(
            {
                tripArr: resultArr.filter((p) =>
                    p[0].DepartureAirport === deptAirport && p[0].ArrivalAirport === arrAirport
                    && Date.parse(p[0].DepartureDate) === Date.parse(deptDate) && Date.parse(p[1].ArrivalDate) === Date.parse(retDate)
                    && p[0][deptCabinClass]["AvailableSeats"] >= Number(adultCount) + Number(childCount)
                    && p[1][arrCabinClass]["AvailableSeats"] >= Number(adultCount) + Number(childCount)),
            }
            , () => sessionStorage.setItem('searchQuery', null )) 



    }
    render() {
        const { tripArr, userId } = this.state

        return (
            <div className="flex-col" >
                <MyHeader userId={userId} parentSearch={(adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, deptCabinClass, arrCabinClass) => this.handleSearch(adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, deptCabinClass, arrCabinClass)} />

                <div className="trip-search-results">

                    {tripArr.map((t) => <Trip deptFlight={t[0]} arrFlight={t[1]} deptCabin={this.deptCabin} arrCabin={this.arrCabin} adults={this.adultCount} children={this.childCount} userId={this.state.userId} />)}
                </div>
            </div>
        )
    }
}
export default withRouter(Home)