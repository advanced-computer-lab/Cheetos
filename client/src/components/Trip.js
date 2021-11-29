import React, { Component } from 'react'
import '../style/trip.css';
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import LuggageIcon from '@mui/icons-material/Luggage';


export default class Trip extends Component {
    state = {
        showModal: false,

    }
    handleModalShow() {
        this.setState({
            showModal: this.state.showModal ? false : true,
        });
    }
    render() {
        const { deptFlight,arrFlight } = this.props
        
        return (
            <>
                <div className="trip-card ">
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

                            <a href="#" onClick={this.handleModalShow.bind(this)}>more  {">"}</a>
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

                            <a href="#" onClick={this.handleModalShow.bind(this)}>more  {">"}</a>
                        </div>

                    </div>
                    <div className="vl">

                    </div>
                    <div className="trip-flex-col" style={{ width: '30%' }} >
                        <h3>10,000$</h3>
                        <Button
                            onClick={this.handleProfileClick}
                            style={{
                                backgroundColor: "#37A1E2",
                                width: "60%",
                                height: "5vh",
                                fontSize: "small",
                            }}
                            //change for laterrrrrrrrrrrrrr
                            variant="contained"
                        >
                            View Deal
                        </Button>
                    </div>
                </div>

                <Modal
                    show={this.state.showModal}
                    onHide={this.handleModalShow.bind(this)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered

                >
                    <Modal.Header className="msg-header" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Flight number : A18732
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ height: "20vh" }}>

                        <div className="details-modal ">
                            {/* <div style={{ width: '70%'  , marginTop : '5px'}} > */}

                            <div className="modal-trip"  >

                                <div className="trip-flex-col">
                                    <strong>12-12-2021  {">"} 12-12-2021</strong>
                                    <p>5:30  {">"} 17:30</p>
                                </div>

                                <div >
                                    <strong>32h 08m</strong>
                                    <p>CAI-LAX</p>
                                </div>

                                <strong>Economy</strong>

                            </div>
                            <div className="vl"> </div>

                            <div className="flex-row" style={{ width: '30%' }} >

                                <div className="trip-flex-col" style={{ alignItems: "flex-start" }}>
                                    <div className="flex-row" style={{ width: "10rem", justifyContent: "flex-start" }} ><LuggageIcon /><p>Carry-on</p></div>
                                    <div className="flex-row" style={{ width: "10rem", justifyContent: "flex-start" }}><LuggageIcon /><p>Checked bag</p></div>
                                </div>
                                <div className="trip-flex-col"><p>2</p><p>1</p></div>

                            </div>

                            {/* </div> */}
                        </div>

                    </Modal.Body>

                </Modal>

            </>


        )
    }
}