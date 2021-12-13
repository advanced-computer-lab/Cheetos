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
        return (
            <div>
                 <div className="flex-col" >
                    {/* <MyHeader/> */}


                    <div className="single-confirm" >
                        <div style={{ width: '70%', marginTop: '5px' }} >


                           

                            <div className="booking-flight"  >


                                <div className="trip-flex-col">
                                    <p className="emphasis">02-12-2021{" >"} 18-12-2021 </p>
                                    <p>03:10{">"}22:10</p>
                                </div>

                                <div className="trip-flex-col">
                                    <div className="emphasis" ><AirlineSeatReclineNormalIcon />A1</div>
                                    <p style={{ width: "12", textAlign: "center" }}>Economy
                                        </p>
                                </div>

                                <p className="emphasis">112$</p>



                            </div>







                        </div>
                        <div className="vl">

                        </div>
                        <div className="trip-flex-col" style={{ width: '30%' }} >
                            <h3>1177$</h3>
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
