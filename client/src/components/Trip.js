import React, { Component } from 'react'
import '../style/trip.css';
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import LuggageIcon from '@mui/icons-material/Luggage';
import { Link } from "react-router-dom";
import TripDetailsModal from './TripDetailsModal';

export default class Trip extends Component {
    state = {
        showModaldept: false,
        showModalarr: false,

    }
    handleModalShow(modal) {
        console.log("modal isss " , modal)
        this.setState(
            {
              ...this.state,
              [modal]: !this.state[modal]
            });
    }
    handleViewDeal(totalPrice , retPrice  , deptPrice , adults , children){
        console.log("i am saving deaaaaaaaaaaaaaaaaaaaaaaaaaal ") ; 
        const data = {...this.props , totalPrice , deptPrice , retPrice , adults , children }
        sessionStorage.setItem('deal', JSON.stringify(data) );
        console.log(JSON.parse(sessionStorage.getItem('deal')));
    }

    render() {
        const { deptFlight, arrFlight, deptCabin, arrCabin, adults, children } = this.props
        const deptPrice = (deptFlight[deptCabin]["PriceAdult"] * adults) + (deptFlight[deptCabin]["PriceChild"] * children)
        const retPrice = (arrFlight[arrCabin]["PriceAdult"] * adults) + (arrFlight[arrCabin]["PriceChild"] * children)
        // edit later when u add retPrice ^^^ inside total price  ; 
        const totalPrice = deptPrice + retPrice;
        return (
            <>
                <div className="booking-card ">
                    <div style={{ width: '70%', marginTop: '5px' }} >

                        <div className="trip-flight"  >
                            <h4>{deptFlight.FlightNumber} </h4>
                            <div className="trip-flex-col">

                                <h5>{deptFlight.DepartureDate} {">"} {deptFlight.ArrivalDate}  </h5>

                                <p>{deptFlight.DepartureTime} {">"} {deptFlight.ArrivalTime}</p>
                            </div>

                            <div className="trip-flex-col">
                                <strong>{deptFlight.TripDuration}</strong>
                                <p>{deptFlight.DepartureAirport}-{deptFlight.ArrivalAirport} </p>
                            </div>

                            <a href="#" onClick={this.handleModalShow.bind(this,"showModaldept")}>details {">"}</a>
                        </div>
                        <div className="trip-flight"  >
                            <h4>{arrFlight.FlightNumber} </h4>
                            <div className="trip-flex-col">

                                <h5>{arrFlight.DepartureDate} {">"} {arrFlight.ArrivalDate}  </h5>

                                <p>{arrFlight.DepartureTime} {">"} {arrFlight.ArrivalTime}</p>
                            </div>

                            <div className="trip-flex-col">
                                <strong>{arrFlight.TripDuration}</strong>
                                <p>{arrFlight.DepartureAirport}-{arrFlight.ArrivalAirport} </p>
                            </div>

                            <a href="#" onClick={this.handleModalShow.bind(this,"showModalarr")}>details  {">"}</a>
                        </div>

                    </div>
                    <div className="vl">

                    </div>
                    <div className="trip-flex-col" style={{ width: '30%' }} >
                        <h3>{totalPrice}$</h3>
                        <Link to={{
                            pathname: "/reserve",
                            // data: {...this.props , totalPrice , deptPrice , retPrice , userId } // your data array of objects
                        }}
                            style={{ textDecoration: 'none' }}>
                            <Button
                                onClick={() => this.handleViewDeal(totalPrice , retPrice  , deptPrice , adults , children)}
                                style={{
                                    backgroundColor: "#37A1E2",
                                    height: "5vh",
                                    fontSize: "small",
                                }}
                                //change for laterrrrrrrrrrrrrr
                                variant="contained"
                            >
                                View Deal
                            </Button>
                        </Link>
                    </div>
                </div>

               
               <TripDetailsModal show = {this.state.showModaldept} parentFunc={()=>this.handleModalShow("showModaldept") } fNum ={deptFlight.FlightNumber} depDate ={deptFlight.DepartureDate} arrDate={deptFlight.ArrivalDate} depTime={deptFlight.DepartureTime} arrTime={deptFlight.ArrivalTime} duration={deptFlight.TripDuration} 
               depAirport={deptFlight.DepartureAirport} arrAirport={deptFlight.ArrivalAirport} cabinClass={deptCabin}  baggage = {deptFlight[deptCabin].BaggageAllowance} / >
               
              
                <TripDetailsModal show = {this.state.showModalarr} parentFunc={()=>this.handleModalShow("showModalarr")} fNum ={arrFlight.FlightNumber} depDate ={arrFlight.DepartureDate} arrDate={arrFlight.ArrivalDate} depTime={arrFlight.DepartureTime} arrTime={arrFlight.ArrivalTime} duration={arrFlight.TripDuration} 
               depAirport={arrFlight.DepartureAirport} arrAirport={arrFlight.ArrivalAirport} cabinClass={arrCabin}  baggage = {arrFlight[arrCabin].BaggageAllowance} / >
                
            </>


        )
    }
}
