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
        bookingsArr: []
    }
    customFilter(arr) {

        let newArr = []
        for (let i = 0; i < arr.length / 2; i++) {
            let j = i + arr.length / 2;

            newArr.push({
                PassengerFirstName: arr[i].PassengerFirstName,
                PassengerLastName: arr[i].PassengerLastName,
                PassengerPassportNumber: arr[i].PassengerPassportNumber,
                PassengerType: arr[i].PassengerType,
                DepFlight: arr[i].FlightId,
                ArrFlight: arr[j].FlightId
            })

        }
        return newArr;
    }

    async componentDidMount() {
        const userId = localStorage.getItem('userId');
        console.log("user id in bookinggg", userId);
        await api.getReservationsById(userId).then(reservations => {
            let arr = reservations.data.data
            for (let i = 0; i < arr.length; i++) {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaah " , this.customFilter(arr[i].Reservation));
            }
            this.setState({
                bookingsArr: reservations.data.data
            }, () => console.log("reservations are ------->", reservations.data.data))
        })

    }
    render() {

        const { bookingsArr } = this.state

        return (
            <div className="flex-col">
                <MyHeader />
                <div className="trip-search-results">
                    {
                        bookingsArr ? bookingsArr.map((b) => (
                            b.Reservation ? this.customFilter(b.Reservation).map((t) => (
                                <Booking confirmationNum={b._id} userId={b.UserId} reservation={t} />
                            )) : ""
                        )) : "" }
                </div>
            </div>
        )
    }
}
export default withRouter(MyBookings)