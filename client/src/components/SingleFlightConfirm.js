import React, { Component } from 'react'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "react-router";
import Signin from "../components/Signin"
import api from '../api'
import '../style/EditFlight.css'

export default class SingleFlightConfirm extends Component {
    render() {
        const {departureDate,arrivalDate,departureTime,arrivalTime,seat,cabin,price}=this.props;
        return (
            <div>
                 <div className="flex-col" >
                    {/* <MyHeader/> */}


                    <div className="single-confirm" >
                        <div style={{ width: '70%', marginTop: '5px' }} >


                           

                            <div className="booking-flight"  >


                                <div className="trip-flex-col">
                                    <p className="emphasis">{departureDate}{" >"}{arrivalDate} </p>
                                    <p>{departureTime}{">"}{arrivalTime}</p>
                                </div>

                                <div className="trip-flex-col">
                                    <div className="emphasis" ><AirlineSeatReclineNormalIcon />{seat}</div>
                                    <p style={{ width: "12", textAlign: "center" }}>{cabin==="EconomySeats"?"Economy":cabin==="BusinessSeats"?"Bussiness Class":"First Class"}
                                        </p>
                                </div>

                            </div>


                        </div>
                        <div className="vl">

                        </div>
                        <div className="trip-flex-col" style={{ width: '30%' }} >
                            <h3>{price}$</h3>
                          <Button
                                style={{
                                    backgroundColor: "#447fcc",
                                    width: "170px",
                                    height: "5vh",
                                    fontSize: "small",
                                }}

                                variant="contained"
                            >
                                Confirm Booking
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
