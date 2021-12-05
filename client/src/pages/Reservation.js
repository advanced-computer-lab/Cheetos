import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import '../style/seats.css';
import { Stepper, StepContent, StepLabel, Step } from '@mui/material';
import HorizontalLinearStepper from '../components/HorizontalLinearStepper';
import { withRouter } from 'react-router';
import ChooseSeats from './ChooseSeats';
import ConfirmBooking from './ConfirmBooking';
class Reservation extends Component {
    state = {
        step: 0 , 
        deptSeats : [] , 
        arrSeats : [] 
    }
    handleSeatsConfirm(deptSeats , arrSeats){
        this.setState({
            deptSeats : deptSeats , 
            arrSeats : arrSeats , 
            step : 1 
        })
    }
    render() {
        const { step  ,deptSeats , arrSeats} = this.state
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
                <ChooseSeats  deptFlight = {deptFlight }  arrFlight = {arrFlight} deptCabin = {deptCabin} arrCabin ={arrCabin}   parentFunc = {(deptSeats , arrSeats )=> this.handleSeatsConfirm(deptSeats , arrSeats)} />
                {step == 1 ?
                <ConfirmBooking deptSeats = { deptSeats}  arrSeats = {arrSeats} totalPrice = {totalPrice} />
                : ''}


            </div>
        )
    }
}
export default withRouter(Reservation)