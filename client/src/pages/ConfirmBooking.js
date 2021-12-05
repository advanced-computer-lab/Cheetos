import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "react-router";
import Signin from "../components/Signin"
import api from '../api'
class ConfirmBooking extends Component {

    state = {
        showModal: false,
        resId: "",
        showSignin: false , 
        signedIn : false 
    }
    handleModalShow() {
        this.setState({
            showModal: this.state.showModal ? false : true,
        });
    }
    handleSignInModal() {
        this.setState({
            showSignin: !this.state.showSignin , 
            signedIn : true 
        });
        this.props.parentFunc()
    }
   
    render() {

        const { showModal, showSignin } = this.state
        const { deptSeats, arrSeats } = this.props
        const { deptFlight, arrFlight, deptCabin, arrCabin, adults, children, totalPrice, deptPrice, retPrice, userId } = this.props.location.data
        let deptSeatNames = "";
        let arrSeatNames = "";
        console.log("seats areeeeee ", deptSeats, arrSeats);
        if (deptSeats && arrSeats) {
            for (let i = 0; i < deptSeats.length; i++) {
                if (i == deptSeats.length - 1) {
                    deptSeatNames += deptSeats[i].Seat;
                } else {
                    deptSeatNames += deptSeats[i].Seat + ",";
                }

            }
            for (let i = 0; i < arrSeats.length; i++) {
                if (i == arrSeats.length - 1) {
                    arrSeatNames += arrSeats[i].Seat;
                } else {
                    arrSeatNames += arrSeats[i].Seat + ",";
                }
            }
        }

        // deptSeats ? deptSeats.map((s)=> )  : ''; 
        // arrSeats ? arrSeats.map((s)=> arrSeatNames += s.Seat) : ''; 
        return (
            <>
                <div className="flex-col" >
                    {/* <MyHeader/> */}


                    <div className="booking-card" style={{ marginTop: "50px", marginBottom: "30px" }}>
                        <div style={{ width: '70%', marginTop: '5px' }} >


                            <div className="booking-flight"  >


                                <div className="trip-flex-col">
                                    <p className="emphasis">{deptFlight.DepartureDate}{" >"} {deptFlight.ArrivalDate} </p>
                                    <p>{deptFlight.DepartureTime}{">"}{deptFlight.ArrivalTime}</p>
                                </div>

                                <div className="trip-flex-col">
                                    <div className="emphasis" ><AirlineSeatReclineNormalIcon />{deptSeatNames}</div>
                                    <p style={{ width: "12", textAlign: "center" }}>{deptCabin === "FirstClassSeats" ? "FirstClass" :
                                        deptCabin === "EconomySeats" ? "Economy" :
                                            deptCabin === "BusinessSeats" ? "Business" : ''}</p>
                                </div>

                                <p className="emphasis">{deptPrice}$</p>



                            </div>

                            <div className="booking-flight"  >


                                <div className="trip-flex-col">
                                    <p className="emphasis">{arrFlight.DepartureDate}{" >"} {arrFlight.ArrivalDate} </p>
                                    <p>{arrFlight.DepartureTime}{">"}{arrFlight.ArrivalTime}</p>
                                </div>

                                <div className="trip-flex-col">
                                    <div className="emphasis" ><AirlineSeatReclineNormalIcon />{arrSeatNames}</div>
                                    <p style={{ width: "12", textAlign: "center" }}>{arrCabin === "FirstClassSeats" ? "FirstClass" :
                                        arrCabin === "EconomySeats" ? "Economy" :
                                            arrCabin === "BusinessSeats" ? "Business" : ''}</p>
                                </div>

                                <p className="emphasis">{retPrice}$</p>



                            </div>







                        </div>
                        <div className="vl">

                        </div>
                        <div className="trip-flex-col" style={{ width: '30%' }} >
                            <h3>{totalPrice}$</h3>
                           { !this.state.signedIn ? <Button
                                onClick={this.handleSignInModal.bind(this)}
                                style={{
                                    backgroundColor: "#447fcc",
                                    width: "170px",
                                    height: "5vh",
                                    fontSize: "small",
                                }}

                                variant="contained"
                            >
                                Reserve
                            </Button> : ''}
                        </div>
                    </div>
                </div>
               

                <Modal
                    aria-labelledby="contained-modal-title-vcenter" 
                    size = "sm"
                    centered show={showSignin} onHide={this.handleSignInModal.bind(this)}>
                   

                    <Signin />


                </Modal>


            </>


        )
    }
}

export default withRouter(ConfirmBooking);