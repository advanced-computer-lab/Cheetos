import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import Booking from '../components/Booking'
import api from '../api'
import { withRouter } from 'react-router';
 class MyBookings extends Component {
    state = {
        // bookingsArr: [
        //     {
        //         _id: "A12344",
        //         UserId: "",
        //         Reservation: [
        //             {
        //                 FlightId: 1223,
        //                 CabinClass: "Economy",
        //                 ChosenSeat: "A1",
        //                 Passenger: "",
        //                 Price: 700,
        //                 BaggageAllowance: 3,
        //             },

        //             {
        //                 FlightId: 1223,
        //                 CabinClass: "Economy",
        //                 ChosenSeat: "A1",
        //                 Passenger: "",
        //                 Price: 700,
        //                 BaggageAllowance: 3,
        //             }]
        //     },

        //     {
        //         _id: "A12344",
        //         UserId: "",
        //         Reservation: [{
        //             FlightId: 1223,
        //             CabinClass: "Economy",
        //             ChosenSeat: "A1",
        //             Passenger: "",
        //             Price: 700,
        //             BaggageAllowance: 3,
        //         },

        //         {
        //             FlightId: 1223,
        //             CabinClass: "Business class",
        //             ChosenSeat: "A1",
        //             Passenger: "",
        //             Price: 700,
        //             BaggageAllowance: 3,
        //         }]
        //     }
        // ],
        bookingsArr : [] 
    }
    
    async componentDidMount() {
        const  userId  = sessionStorage.getItem('userId');
        await api.getReservationsById(userId).then(reservations => {
            this.setState({
                bookingsArr : reservations.data.data
            }, () => console.log("reservations are "  , reservations.data.data))
        })

    }
    render() {

        const { bookingsArr } = this.state

        return (
            <div className="flex-col">
                <MyHeader />
                <div className="trip-search-results">
                    {
                        bookingsArr.map((b) => (
                            <Booking confirmationNum={b._id} userId={b.UserId} reservation={b}
                            />
                        ))}
                </div>
            </div>
        )
    }
}
export default withRouter(MyBookings)