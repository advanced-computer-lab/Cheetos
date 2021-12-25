import React, { Component } from 'react'
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';
import Booking from '../components/Booking'
import api from '../api'

export default class BookingReservation extends Component {

    state = {
        bookingsArr: [],
        showModal: false,
    }

    async handleDelete() {
        const { confirmation } = this.props;
        console.log(confirmation)
        await api.deleteReservationById(this.props.b._id).then(
            // alert("flight with conf num is deleted " , this.props.confirmationNum)  , 
            console.log("deleted", confirmation),
            this.handleModalClose(),
            window.location.reload()
        )

    }

    handleModalShow(confirmation) {
        this.setState({
            showModal: this.state.showModal ? false : true,
            confirmation: confirmation
        });
    }

    handleModalClose() {
        this.setState({
            showModal: false
        })
    }

    async handleSendEmail() {
        console.log("sssssssssssssssssssss" , this.props.b.Reservation)
        let payload = {}
        let arr = this.props.b.Reservation
        let depFlight = arr[0]["FlightId"] ; 
        let arrFlight = arr[arr.length-1]["FlightId"]
        console.log("-------------" , depFlight)
        console.log("-------------" , arrFlight)
        if(arr ){
           
             payload = {
                deptFlight : depFlight  , 
                arrFlight :   arrFlight
            }
            await api.payReservation( this.props.b._id   , payload).then(
                alert("sent mail")
            ).catch((err)=>{
                // alert("error in sending email try again later")
            })
            console.log("payloaaaaaaaaaaaaaad" , payload)
        }
       
      
        


    }

    customFilter(arr, id) {

        let newArr = []
        for (let i = 0; i < arr.length / 2; i++) {
            let j = i + arr.length / 2;

            newArr.push({
                PassengerFirstName: arr[i].PassengerFirstName,
                PassengerLastName: arr[i].PassengerLastName,
                PassengerPassportNumber: arr[i].PassengerPassportNumber,
                PassengerType: arr[i].PassengerType,
                PassengerType: arr[i].PassengerType,
                DepFlight: arr[i].FlightId,
                DepSeat: arr[i].ChosenSeat,
                DepCabin: arr[i].CabinClass,
                ArrFlight: arr[j].FlightId,
                ArrSeat: arr[j].ChosenSeat,
                ArrCabin: arr[j].CabinClass,
                id: id
            })

        }
        return newArr;
    }
    render() {
        const { b } = this.props
        return (
            <div>
                <div className='reservation-containor'>
                    <div className='flex-row' style={{ justifyContent: "space-between" }}>
                        <p className='emphasis'> Confirmation Number : {b._id.toUpperCase()}</p>


                        <div className="reservation-buttons">
                            <Button
                                onClick={this.handleSendEmail.bind(this)}
                                style={{
                                    backgroundColor: "#37a1e2",
                                    width: "10px",
                                    padding: "0",
                                    height: "5vh",
                                    fontSize: "small",
                                    borderRadius: "10px"
                                }}
                                variant="contained"
                            >
                                <MailIcon />
                            </Button>
                            <Button
                                onClick={this.handleModalShow.bind(this, b._id)}
                                style={{
                                    backgroundColor: "rgb(201, 6, 6)",
                                    width: "10px",
                                    padding: "0",
                                    height: "5vh",
                                    fontSize: "small",
                                    borderRadius: "10px"
                                }}
                                variant="contained"
                            >
                                <DeleteIcon />
                            </Button>
                        </div>


                    </div>



                    {b.Reservation ? this.customFilter(b.Reservation, b._id).map((t) => (
                        <Booking userId={b.UserId} reservation={t} />
                    )) : ""}
                </div>



                <Modal centered show={this.state.showModal} onHide={this.handleModalShow.bind(this)} dialogClassName="my-modal">
                    <Modal.Header closeButton >
                        <Modal.Title style={{ fontWeight: "600" }}>Heads up!!</Modal.Title>
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
            </div>
        )
    }
}
