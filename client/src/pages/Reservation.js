import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import '../style/seats.css';
import { Stepper, StepContent, StepLabel, Step } from '@mui/material';
import HorizontalLinearStepper from '../components/HorizontalLinearStepper';
import { withRouter } from 'react-router';
import ChooseSeats from './ChooseSeats';
import ConfirmBooking from './ConfirmBooking';
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import api from '../api'
class Reservation extends Component {
    state = {
        step: 0 , 
        showModal: false,
        resId: "",
        deptSeats : [] , 
        arrSeats : [] 
    }
    handleModalShow() {
        this.setState({
            showModal: this.state.showModal ? false : true,
        });
    }
    handleSeatsConfirm(deptSeats , arrSeats){
        this.setState({
            deptSeats : deptSeats , 
            arrSeats : arrSeats , 
        } , () => this.handleConfirm())
    }
    handleSignedIn(){
        this.setState({
            step : 1 
        })
    }
    async handleConfirm() {
        const { deptFlight, arrFlight, deptCabin, arrCabin, adults, children, totalPrice, deptPrice, retPrice, userId } = this.props.location.data
        const { deptSeats, arrSeats } = this.state
        let arrOne = deptSeats.map((s) => ({
            FlightId: deptFlight._id,
            CabinClass: deptCabin === "FirstClassSeats" ? "FirstClass" :
                deptCabin === "EconomySeats" ? "Economy" :
                    deptCabin === "BusinessSeats" ? "Business" : '',
            ChosenSeat: s.Seat
        }))

        let arrTwo = arrSeats.map((s) => ({
            FlightId: arrFlight._id,
            CabinClass: arrCabin === "FirstClassSeats" ? "FirstClass" :
                arrCabin === "EconomySeats" ? "Economy" :
                    arrCabin === "BusinessSeats" ? "Business" : '',
            ChosenSeat: s.Seat
        }))
        let newArr = arrOne.concat(arrTwo);
        console.log("my array of chosen seats objects", newArr);
        const reservation = {
            UserId: userId,
            TotalPrice: totalPrice,
            Reservation: newArr
        }
        console.log("my array of chosen seats objects", reservation);
        await api.confirmFlight(reservation).then((res) => {
            this.setState({
                resId: res.data.data
            })
            this.handleModalShow();
        })
    }
    render() {
        const { step  ,deptSeats , arrSeats , showModal} = this.state
        const { deptFlight, arrFlight, deptCabin, arrCabin, adults, children, totalPrice , userId } = this.props.location.data
        return (
            <div>
                <MyHeader />
                {/* {step == 0 ?
                    <ChooseSeats parentFunc = {()=> this.handleSeatsConfirm() } />
                    : step == 1 ?
                        <ConfirmBooking />
                        : ''
                } */}
                <ConfirmBooking parentFunc = { () => this.handleSignedIn() }deptSeats = { deptSeats}  arrSeats = {arrSeats} totalPrice = {totalPrice} />
                {step == 1 ? 
            
                    <ChooseSeats  deptFlight = {deptFlight }  arrFlight = {arrFlight} deptCabin = {deptCabin} arrCabin ={arrCabin}   parentFunc = {(deptSeats , arrSeats )=> this.handleSeatsConfirm(deptSeats , arrSeats)} />
               
                : ''}

                <Modal
                    aria-labelledby="contained-modal-title-vcenter" centered show={showModal} onHide={this.handleModalShow.bind(this)}>
                    <Modal.Header closeButton style={{ backgroundColor: "#14279b" }}>
                        <Modal.Title style={{ color: "white" }}>Successfully Booked !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><h5>
                        Your flight has been been booked !<br />
                        Here is your confirmation number : <strong>{this.state.resId}</strong>

                    </h5>
                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}
export default withRouter(Reservation)