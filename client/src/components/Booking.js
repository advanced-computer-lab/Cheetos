import React, { Component } from 'react'
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import Button from "@mui/material/Button";
import '../style/booking.css';
import '../style/trip.css';
import Modal from "react-bootstrap/Modal";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import api from '../api'
import { withRouter } from 'react-router';

export default class Booking extends Component {



    state = {
        showModal: false,
        deptFlight: "",
        arrFlight: ""
    }
    handleModalShow() {
        this.setState({
            showModal: this.state.showModal ? false : true,
        });
    }
   async handleDelete() {
        await api.deleteReservationById(this.props.confirmationNum).then(
            // alert("flight with conf num is deleted " , this.props.confirmationNum)  , 
            console.log("deleted" , this.props.confirmationNum)  , 
            this.handleModalShow() ,
            window.location.reload()
        )
       
    }
    async componentDidMount() {
        const { confirmationNum, userId, reservation } = this.props
        console.log("reserv coming to booking is ", reservation)
        const { DepFlight, ArrFlight } = reservation
        await api.getFlightById(DepFlight.Id).then((Flight) => {
            this.setState({
                deptFlight: Flight.data.data
            }, () => console.log(Flight.data.data))
        }
        )
        await api.getFlightById(ArrFlight.Id).then((Flight) => {
            this.setState({
                arrFlight: Flight.data.data
            }, () => console.log(Flight.data.data))
        }
        )

    }
    render() {
        let price = 0;
        const { confirmationNum, userId, reservation } = this.props
        // const { Reservation } = reservation
        // let deptSeats = []
        // let retSeats = []
        // let f = Reservation[0]._id
        // for (let i = 0; i < Reservation.length ; i++ ){
        //     if(f === Reservation[i]._id){
        //         deptSeats.push(Reservation[i]._id)
        //     }else{
        //         retSeats.push(Reservation[i]._id)
        //     }
        // }
        const { showModal, deptFlight, arrFlight } = this.state

        // for(let i = 0 ; i< reservation.length ;i++){
        //     price+=reservation[i].Price; 
        //  }
        const { DepFlight, ArrFlight  , Reservation} = reservation
        const deptCabin = Reservation[0].CabinClass 
        const arrCabin= Reservation[Reservation.length -1].CabinClass 
        return (
            <>

                <div className="booking-card">
                    <div style={{ width: '70%', marginTop: '5px' }} >

                        <div style={{ marginLeft: "4rem", marginBottom: "20px", marginTop: "15px" }}><strong>
                            <h5>Confirmation Number : {confirmationNum}</h5>
                        </strong></div>







                        <div className="booking-flight"  >


                            <div className="trip-flex-col">
                                <p className="emphasis">{deptFlight.DepartureDate}{">"} {deptFlight.ArrivalDate}  </p>
                                <p>{deptFlight.DepartureTime} {">"} {deptFlight.ArrivalTime}</p>
                            </div>

                            <div className="trip-flex-col">
                                <div className="emphasis"><AirlineSeatReclineNormalIcon />{DepFlight.DeptSeats ? DepFlight.DeptSeats.toString() : ''}</div>
                                <p style={{ width: "120px", textAlign: "center" }}>{deptCabin}</p>
                            </div>

                            <div className="trip-flex-col">
                                <p className="emphasis">{deptFlight.TripDuration} </p>
                                <p>{deptFlight.DepartureAirport}-{deptFlight.ArrivalAirport}</p>
                            </div>
                            {/* <p>CAI-LAX</p> */}


                        </div>
                        <div className="booking-flight"  >


                            <div className="trip-flex-col">
                                <p className="emphasis">{arrFlight.DepartureDate}{">"} {arrFlight.ArrivalDate}  </p>
                                <p>{arrFlight.DepartureTime} {">"} {arrFlight.ArrivalTime}</p>
                            </div>

                            <div className="trip-flex-col">
                                <div className="emphasis"><AirlineSeatReclineNormalIcon />{ArrFlight.ArrSeats ? ArrFlight.ArrSeats.toString():''}</div>
                                <p style={{ width: "120px", textAlign: "center" }}>{arrCabin}</p>
                            </div>

                            <div className="trip-flex-col">
                                <p className="emphasis">{arrFlight.TripDuration} </p>
                                <p>{arrFlight.DepartureAirport}-{arrFlight.ArrivalAirport}</p>
                            </div>
                            {/* <p>CAI-LAX</p> */}


                        </div>













                    </div>
                    <div className="vl">

                    </div>
                    <div className="trip-flex-col" style={{ width: '30%' }} >
                        <h3>{reservation.TotalPrice}$</h3>
                        <Button
                            onClick={this.handleModalShow.bind(this)}
                            style={{
                                backgroundColor: "rgb(201, 6, 6)",
                                width: "2 em",
                                height: "5vh",
                                fontSize: "small",
                            }}

                            variant="contained"
                        >
                            Cancel Booking
                        </Button>
                    </div>
                </div>

                <Modal centered show={showModal} onHide={this.handleModalShow.bind(this)}>
                    <Modal.Header closeButton style={{ backgroundColor: "#14279b" }}>
                        <Modal.Title style={{ color: "white" }}>Heads up!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to cancel this booking?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" style={{ color: "red" }} onClick={this.handleModalShow.bind(this)}>
                            Cancel
                        </Button>
                        <Button variant="secondary" onClick={this.handleDelete.bind(this)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }
}
