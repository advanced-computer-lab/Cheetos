import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import Seats from '../components/Seats'
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export default class ChooseSeats extends Component {
    render() {
        return (
            <div className="seats-page">
                <MyHeader />
                <div className="shuttles">
                    <Seats type="Departure flight" seatClass="First class" />
                    <Seats type="Return flight" seatClass="Economy class" />
                </div>
                <Link to={{
                    pathname: "/confirm",
                    state: {
                         msg: "helloozz" 
                         }
                      }} 
                style={{ textDecoration: 'none' }} 
                >
                    <Button

                        style={{
                            backgroundColor: "#447fcc",
                            width: "15em",
                            height: "7vh",
                            fontSize: "small",
                        }}

                        variant="contained"
                    >
                        Confirm Seats
                    </Button>
                </Link>
            </div>
        )
    }
}
