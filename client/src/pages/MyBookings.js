import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import Booking from '../components/Booking'
import api from '../api'
import { withRouter } from 'react-router';

import Button from "@mui/material/Button";
import '../style/booking.css';
import '../style/trip.css';
import Modal from "react-bootstrap/Modal";
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';

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
        bookingsArr: [],
        showModal: false,
        confirmation:"",
    }


    handleModalShow(confirmation) {
        this.setState({
            showModal: this.state.showModal ? false : true,
            confirmation: confirmation
        });
    }

    handleModalClose(){
        this.setState({
            showModal:false
        })
    }

    handleSendEmail(){

    }

    async handleDelete() {
        await api.deleteReservationById(this.state.confirmation).then(
            // alert("flight with conf num is deleted " , this.props.confirmationNum)  , 
            console.log("deleted", this.state.confirmation),
            this.handleModalClose(),
            window.location.reload()
        )

    }

    customFilter(arr) {

        let newArr = []
        for (let i = 0; i < arr.length / 2; i++) {
            let j = i + arr.length / 2;

            newArr.push({
                PassengerFirstName: arr[i].PassengerFirstName,
                PassengerLastName: arr[i].PassengerLastName,
                PassengerPassportNumber: arr[i].PassengerPassportNumber,
                PassengerType : arr[i].PassengerType , 
                PassengerType: arr[i].PassengerType,
                DepFlight: arr[i].FlightId,
                DepSeat : arr[i].ChosenSeat , 
                DepCabin : arr[i].CabinClass , 
                ArrFlight: arr[j].FlightId , 
                ArrSeat : arr[j].ChosenSeat,
                ArrCabin : arr[i].CabinClass
            })

        }
        return newArr;
    }

    async componentDidMount() {
        const userId = localStorage.getItem('userId');
        if(!userId ){
            this.props.history.push('/');
        }
        // else if (userId && localStorage.getItem('type')){
        //     this.props.history.push('/admin');
        // }
        else{
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
        

    }
    render() {

        const { bookingsArr } = this.state

        return (
            <>
            <div className="flex-col">
                <MyHeader />
                <div className="trip-search-results">
                    

                        {   bookingsArr ? bookingsArr.map((b) => (
                        <div className='reservation-containor'>
                            <div className='flex-row' style={{justifyContent: "space-between"}}>
                                <p className='emphasis'> Confirmation Number : {b._id.toUpperCase()}</p>
                                

                                <div className="reservation-buttons">
                                    <Button
                                    onClick={this.handleSendEmail.bind(this)}
                                    style={{
                                        backgroundColor: "#37a1e2",
                                        width: "10px",
                                        padding:"0",
                                        height: "5vh",
                                        fontSize: "small",
                                        borderRadius:"10px"
                                    }}
                                    variant="contained"
                                                            >
                                    <MailIcon/>
                                    </Button>
                                    <Button
                                    onClick={this.handleModalShow.bind(this,b._id)}
                                    style={{
                                        backgroundColor: "rgb(201, 6, 6)",
                                        width: "10px",
                                        padding:"0",
                                        height: "5vh",
                                        fontSize: "small",
                                        borderRadius:"10px"
                                    }}
                                    variant="contained"
                                                            >
                                    <DeleteIcon/>
                                    </Button>
                                </div>

                               
                            </div>

                         
                            
                                   { b.Reservation ? this.customFilter(b.Reservation).map((t) => (
                                        <Booking  userId={b.UserId} reservation={t} />
                                        )) : ""}

                        </div>
                               
                           
                           
                           )) : "" }

                        
                    
                </div>
            </div>

            <Modal centered show={this.state.showModal} onHide={this.handleModalShow.bind(this)} dialogClassName="my-modal">
                    <Modal.Header closeButton >
                        <Modal.Title style={{fontWeight:"600"}}>Heads up!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to cancel this booking?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleModalShow.bind(this)}>
                            Cancel
                        </Button>
                        <Button variant="secondary" style={{ color: "red" }} onClick={this.handleDelete.bind(this)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>


                
            </>
        )
    }
}
export default withRouter(MyBookings)