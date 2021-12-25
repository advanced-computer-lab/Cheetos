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
import SingleSeats from './SingleSeats';


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
            console.log("deleted", this.props.confirmationNum),
            this.handleModalShow(),
            window.location.reload()
        )

    }
    async componentDidMount() {
        const { confirmationNum, userId, reservation } = this.props
        // console.log("reserv coming to booking is ", reservation)
        const { DepFlight, ArrFlight } = reservation
        await api.getFlightById(DepFlight._id).then((Flight) => {
            this.setState({
                deptFlight: Flight.data.data
            }, () => console.log(Flight.data.data))
            //, () => console.log(Flight.data.data)
        }
        )
        await api.getFlightById(ArrFlight._id).then((Flight) => {
            this.setState({
                arrFlight: Flight.data.data
            }, () => console.log(Flight.data.data))
            //, () => console.log(Flight.data.data)
        }
        )

    }
    handleSeatsChange(att, seats) {
        console.log("chosen seats are ", att, seats)
        sessionStorage.setItem(att, JSON.stringify(seats));
        this.setState(
            {
                ...this.state,
                [att]: seats
            }
        )
    }

    editDeparture(oldFlight) {
        sessionStorage.setItem("oldCabin", this.props.reservation.DepCabin);
        sessionStorage.setItem("oldSeat", reservation.DepSeat)
        sessionStorage.setItem("oldFlight", JSON.stringify(oldFlight));
        const { reservation } = this.props
        sessionStorage.setItem("editReservation", JSON.stringify(reservation));
        sessionStorage.setItem('depFlight', JSON.stringify(this.state.deptFlight));
        sessionStorage.setItem('retFlight', JSON.stringify(this.state.arrFlight));
        this.props.history.push("/editDep");
    }
    editReturn(oldFlight) {
        sessionStorage.setItem("oldCabin", this.props.reservation.ArrCabin);
        const { reservation } = this.props
        sessionStorage.setItem("oldSeat", reservation.ArrSeat)
        sessionStorage.setItem("oldFlight", JSON.stringify(oldFlight));
        sessionStorage.setItem("editReservation", JSON.stringify(reservation));
        sessionStorage.setItem('depFlight', JSON.stringify(this.state.deptFlight));
        sessionStorage.setItem('retFlight', JSON.stringify(this.state.arrFlight));
        this.props.history.push("/editRet");
    }

    render() {

        const { confirmationNum, userId, reservation } = this.props
        const { PassengerFirstName, PassengerLastName,
            PassengerType,
            ArrFlight, DepFlight,
            DepCabin, ArrCabin,
            DepSeat, ArrSeat } = reservation

        const { showModal, deptFlight, arrFlight } = this.state
        console.log("--------------------------------------> ", deptFlight, arrFlight)
        let dep = DepCabin === "Economy" ? "EconomySeats" :
            DepCabin === "Business" ? "BusinessSeats" :
                DepCabin === "FirstClass" ? "FirstClassSeats" : ""
        let arr = DepCabin === "Economy" ? "EconomySeats" :
            DepCabin === "Business" ? "BusinessSeats" :
                DepCabin === "FirstClass" ? "FirstClassSeats" : ""
        let depType = PassengerType === "Adult" ? "PriceAdult" : "PriceChild"
        let arrType = PassengerType === "Adult" ? "PriceAdult" : "PriceChild"
        let totalPrice = deptFlight && arrFlight ? deptFlight[dep][depType] + arrFlight[arr][arrType] : 0;
        // let totalPrice = 0;


        return (
            <>

                <div className="booking-card">
                    <div style={{ width: '70%', marginTop: '5px' }} >

                        <div style={{ marginLeft: "2rem", marginBottom: "7px", marginTop: "0px" }}><strong>
                            {/* <h5>Confirmation Number : {confirmationNum.toUpperCase()}</h5> */}
                            <h5 className='emphasis'>{PassengerFirstName.toUpperCase() + " " + PassengerLastName.toUpperCase()}</h5>
                        </strong></div>



                        <div className="booking-flight" style={{ marginTop: "0px" }}  >


                            <div className="trip-flex-col">
                                <p className="emphasis">{deptFlight.DepartureDate}{">"} {deptFlight.ArrivalDate}  </p>
                                <p>{deptFlight.DepartureTime} {">"} {deptFlight.ArrivalTime}</p>
                            </div>

                            <div className="trip-flex-col">
                                <div className='flex-row'>
                                    <div className="emphasis"><AirlineSeatReclineNormalIcon />{DepSeat}</div>
                                    <EditIcon className={new Date() < new Date(deptFlight.DepartureDate) ? "icon" : "icon-disabled"} onClick={new Date() < new Date(deptFlight.DepartureDate) ? this.handleModalShow.bind(this) : ''} />
                                </div>
                                <p style={{ width: "120px", textAlign: "center" }}>{reservation.DepCabin}</p>
                            </div>

                            <div className="trip-flex-col">
                                <p className="emphasis">{deptFlight.TripDuration} </p>
                                <p>{deptFlight.DepartureAirport}-{deptFlight.ArrivalAirport}</p>
                            </div>


                            {/* <Link to='/editDep'> */}
                            <EditIcon className={new Date() < new Date(deptFlight.DepartureDate) ? "icon" : "icon-disabled"} onClick={new Date() < new Date(deptFlight.DepartureDate) ? () => this.editDeparture(deptFlight) : ''} />
                            {/* </Link> */}

                        </div>

                        <div className="booking-flight" >


                            <div className="trip-flex-col">
                                <p className="emphasis">{arrFlight.DepartureDate}{">"} {arrFlight.ArrivalDate}  </p>
                                <p>{arrFlight.DepartureTime} {">"} {arrFlight.ArrivalTime}</p>
                            </div>

                            <div className="trip-flex-col">
                                <div className='flex-row'>
                                    <div className="emphasis"><AirlineSeatReclineNormalIcon />{ArrSeat}</div>
                                    <EditIcon className={(new Date()) < (new Date(arrFlight.DepartureDate)) ? "icon" : "icon-disabled"} onClick={new Date() < new Date(arrFlight.DepartureDate) ? this.handleModalShow.bind(this) : ''} />
                                </div>


                                <p style={{ width: "120px", textAlign: "center" }}>{reservation.ArrCabin}</p>

                            </div>

                            <div className="trip-flex-col">
                                <p className="emphasis">{arrFlight.TripDuration} </p>
                                <p>{arrFlight.DepartureAirport}-{arrFlight.ArrivalAirport}</p>
                            </div>

                            <EditIcon className={(new Date()) < (new Date(arrFlight.DepartureDate)) ? "icon" : "icon-disabled"} onClick={new Date() < new Date(arrFlight.DepartureDate) ? () => this.editReturn(arrFlight) : ''} />

                        </div>













                    </div>
                    <div className="vl">

                    </div>
                    <div className="trip-flex-col" style={{ width: '30%' }} >
                        <h3>{totalPrice}$</h3>

                    </div>
                </div>
                <Modal centered show={this.state.showModal} onHide={this.handleModalShow.bind(this)} dialogClassName="my-modal2">
                    <Modal.Header closeButton >
                        <Modal.Title style={{ fontWeight: "600" }}>Edit your Seats</Modal.Title>
                    </Modal.Header>
                    <SingleSeats preChosen={[]} parentFunc={(att, seats) => this.handleSeatsChange(att, seats)} seats={[]} att="editSeats" type={""} seatClass={""} passengers={1} />
                    <Modal.Body>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleModalShow.bind(this)}>
                            Confirm
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
export default withRouter(Booking);