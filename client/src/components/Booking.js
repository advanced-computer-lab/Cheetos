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
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";


 class Booking extends Component {


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

    editDeparture(){
        sessionStorage.setItem('depFlight', JSON.stringify(this.state.deptFlight));
        sessionStorage.setItem('retFlight', JSON.stringify(this.state.arrFlight));
        this.props.history.push("/editDep");
    }
    editReturn(){
       
        sessionStorage.setItem('depFlight', JSON.stringify(this.state.deptFlight));
        sessionStorage.setItem('retFlight', JSON.stringify(this.state.arrFlight));
        this.props.history.push("/editRet");
    }
  
    render() {
        let price = 0;
        const { confirmationNum, userId, reservation } = this.props
        
        const { showModal, deptFlight, arrFlight } = this.state

        
        const { DepFlight, ArrFlight  , Reservation} = reservation
        const deptCabin = Reservation[0].CabinClass 
        const arrCabin= Reservation[Reservation.length -1].CabinClass 

       
        return (
            <>

                <div className="booking-card">
                    <div style={{ width: '70%', marginTop: '5px' }} >

                        <div style={{ marginLeft: "2rem", marginBottom: "7px", marginTop: "20px" }}><strong>
                            <h5>Confirmation Number : {confirmationNum.toUpperCase()}</h5>
                            <h5>Mr. Mark Potter</h5>
                        </strong></div>



                        <div className="booking-flight" style={{marginTop:"0px"}}  >


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
                            
                            
                            {/* <Link to='/editDep'> */}
                                <EditIcon className="icon" onClick={this.editDeparture.bind(this)}/>
                            {/* </Link> */}

                        </div>
                        <div className="booking-flight" >


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
                            <Link to='/editRet'>
                                <EditIcon className="icon" onClick={this.editReturn.bind(this)}/>
                            </Link>
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
                        <Button variant="primary"  onClick={this.handleModalShow.bind(this)}>
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
export default withRouter(Booking);