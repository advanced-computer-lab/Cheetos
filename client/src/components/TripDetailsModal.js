import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import LuggageIcon from '@mui/icons-material/Luggage';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

export default class TripDetailsModal extends Component {

   
    render() {
        const {baggage  , show,fNum,depDate,arrDate,depTime,arrTime,duration,depAirport,arrAirport,cabinClass,baggageAllowance} = this.props;
        return (
            <div>
                 <Modal
                    show={show}
                    onHide={() => this.props.parentFunc()}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered

                >
                    <Modal.Header  closeButton>
                        <Modal.Title id="contained-modal-title-vcenter"style={{fontWeight:"600"}}>
                            Flight number : {fNum}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ height: "20vh" }}>

                        <div className="details-modal ">
                            {/* <div style={{ width: '70%'  , marginTop : '5px'}} > */}

                            <div className="modal-trip"  >

                                <div className="trip-flex-col">
                                    <strong>{depDate}  {">"} {arrDate}</strong>
                                    <p>{depTime}  {">"} {arrTime}</p>
                                </div>

                                <div >
                                    <strong>{duration}</strong>
                                    <p>{depAirport}-{arrAirport}</p>
                                </div>

                                <strong>{cabinClass === "EconomySeats"? "Economy" : cabinClass === "BusinessClass" ? "Business Class" : "First Class" }</strong>

                            </div>
                            <div className="vl"> </div>

                            <div className="flex-row" style={{ width: '30%' ,justifyContent:"space-evenly"}} >

                                {/* <div className="trip-flex-col" style={{ alignItems: "flex-start" }}> */}
                                    <div className="flex-row" style={{ width: "2rem", justifyContent: "flex-start" , alignItems: "flex-start" }} ><LuggageIcon /><p>{baggage.Number}</p></div>
                                    <p>x</p>
                                {/* </div> */}
                                <div className="flex-row" style={{  alignItems: "stretch" }}><MonitorWeightIcon/> <p>{baggage.Size}</p></div>

                            </div>

                         
                        </div>

                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}
