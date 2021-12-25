import React, { Component } from 'react'

import Button from "@mui/material/Button";
import '../style/booking.css';
import '../style/trip.css';
import Modal from "react-bootstrap/Modal";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import api from '../api'
import { withRouter } from 'react-router';
import TripDetailsModal from './TripDetailsModal';


class SingleFlight extends Component {
    state = {
        showModal: false,
        deptCabin: "",
        searchFlight: "",
    }
    handleModalShow() {

        this.setState(
            {

                showModal: !this.state.showModal
            });
    }
    componentDidMount() {
        if (this.props.location.pathname === "/editDep") {

            //console.log("heck2",this.state.deptCabin);
            this.setState({
                searchFlight: JSON.parse(sessionStorage.getItem('depFlight')),
                deptCabin: sessionStorage.getItem('cabinSearch')
            }, () => console.log("heck", this.state.searchFlight, sessionStorage.getItem('cabinSearch')))

        }
        else {
            this.setState({
                searchFlight: JSON.parse(sessionStorage.getItem('retFlight')),
                deptCabin: sessionStorage.getItem('cabinSearch')

            }, () => console.log(this.state.deptCabin, "c2"))
            console.log("ahhhhhh");
        }

    }
    render() {
        const { showModal, flight, searchFlight } = this.props;
        const { deptCabin, } = this.state;
        // const flight = JSON.parse(sessionStorage.getItem('depFlight'))

        return (
            <>
                <div className="single-card">

                    <div style={{ width: '70%', marginTop: '5px' }} >


                        <div className="booking-flight"  >

                            <p className="emphasis"> {flight.FlightNumber}</p>
                            <div className="trip-flex-col">
                                <p className="emphasis">{flight.DepartureDate}{">"} {flight.ArrivalDate}  </p>
                                <p>{flight.DepartureTime} {">"} {flight.ArrivalTime}</p>
                            </div>



                            <div className="trip-flex-col">
                                <p className="emphasis">{flight.TripDuration} </p>
                                <p>{flight.DepartureAirport}-{flight.ArrivalAirport}</p>
                            </div>


                            <a href="#" onClick={this.handleModalShow.bind(this, "showModal")}>Details {">"}</a>

                        </div>


                    </div>
                    <div className="vl">

                    </div>
                    <div className="trip-flex-col" style={{ width: '30%' }} >

                        {/* check type -> adult 
                        compare prices 
                        old>new -> old - new 
                        new>old -> new - old */}
                        <h3>{flight[sessionStorage.getItem('cabinSearch')].PriceAdult}$</h3>
                        <Button

                            style={{
                                backgroundColor: "#37A1E2",
                                width: "5 em",
                                height: "5vh",
                                fontSize: "small",
                            }}
                            onClick = {()=> this.props.parentFunc(flight)}
                            variant="contained"
                        >
                            Reserve
                        </Button>
                    </div>
                </div>

                <TripDetailsModal show={this.state.showModal} parentFunc={() => this.handleModalShow("showModal")} fNum={flight.FlightNumber} depDate={flight.DepartureDate} arrDate={flight.ArrivalDate} depTime={flight.DepartureTime} arrTime={flight.ArrivalTime} duration={flight.TripDuration}
                    depAirport={flight.DepartureAirport} arrAirport={flight.ArrivalAirport} cabinClass={deptCabin} baggage={flight[sessionStorage.getItem('cabinSearch')].BaggageAllowance} />


            </>
        )
    }
}
export default withRouter(SingleFlight)
