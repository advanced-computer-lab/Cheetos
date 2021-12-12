import React, { Component } from 'react'

import Button from "@mui/material/Button";
import '../style/booking.css';
import '../style/trip.css';
import Modal from "react-bootstrap/Modal";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import api from '../api'
import { withRouter } from 'react-router';
import TripDetailsModal from './TripDetailsModal';


export default class SingleFlight extends Component {
    state = {
        showModal: false,
        deptCabin:"EconomySeats"
    }
    handleModalShow() {
       
        this.setState(
            {
           
              showModal: !this.state.showModal
            });
    }
    render() {
        const { showModal, deptFlight } = this.props;
        const{deptCabin}=this.state;
        return (
            <>
            <div className="single-card">
                    <div style={{ width: '70%', marginTop: '5px' }} >

                        <div style={{ marginLeft: "1.5rem", marginBottom: "10px", marginTop: "7px" }}><strong>
                            {/* <h5>Confirmation Number : {confirmationNum.toUpperCase()}</h5> */}
                            <h5>Flight Number : {deptFlight.FlightNumber}</h5>
                        </strong></div>



                        <div className="booking-flight"  >


                            <div className="trip-flex-col">
                                <p className="emphasis">{deptFlight.DepartureDate}{">"} {deptFlight.ArrivalDate}  </p>
                                <p>{deptFlight.DepartureTime} {">"} {deptFlight.ArrivalTime}</p>
                            </div>

                            

                            <div className="trip-flex-col">
                                <p className="emphasis">{deptFlight.TripDuration} </p>
                                <p>{deptFlight.DepartureAirport}-{deptFlight.ArrivalAirport}</p>
                            </div>
                            
                            
                            <a href="#" onClick={this.handleModalShow.bind(this,"showModal")}>Details {">"}</a>

                        </div>
                        

                    </div>
                    <div className="vl">

                    </div>
                    <div className="trip-flex-col" style={{ width: '30%' }} >
                        <h3>177$</h3>
                        <Button
                           
                            style={{
                                backgroundColor: "#37A1E2",
                                width: "2 em",
                                height: "5vh",
                                fontSize: "small",
                            }}

                            variant="contained"
                        >
                            Reserve
                        </Button>
                    </div>
                </div>

        <TripDetailsModal show = {this.state.showModal} parentFunc={()=>this.handleModalShow("showModal") } fNum ={deptFlight.FlightNumber} depDate ={deptFlight.DepartureDate} arrDate={deptFlight.ArrivalDate} depTime={deptFlight.DepartureTime} arrTime={deptFlight.ArrivalTime} duration={deptFlight.TripDuration} 
        depAirport={deptFlight.DepartureAirport} arrAirport={deptFlight.ArrivalAirport} cabinClass={deptCabin}  baggage =  {deptFlight[deptCabin].BaggageAllowance}/ >
           
            </>
        )
    }
}
