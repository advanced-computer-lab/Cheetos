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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Payment from '../components/Payment';
import DatePicker from 'react-datepicker';
import PassengersInfo from '../components/PassengersInfo';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { withToken } from 'react-bootstrap-typeahead';

const steps = ["Flight Details", "Seat Selection", "Passenger Information", "Payment"];
class Reservation extends Component {
    state = {
        activeStep: 0,
        skipped: new Set(),
        step: 0,
        showModal: false,
        resId: "",
        deptSeats: [],
        arrSeats: [],
        seatsWarningModal: false,


    }
   
    componentWillUnmount() {
        sessionStorage.removeItem("deptSeats")
        sessionStorage.removeItem("arrSeats")
        sessionStorage.removeItem("passengersInfo")
        sessionStorage.removeItem("deal")
    }

    handleModalShow() {
        if (this.state.showModal) {
            this.setState({
                showModal: false
            });
            this.props.history.push("/bookings")
        } else {
            this.setState({
                showModal: true
            });
        }

    }

    handleSeatWarningShow() {
        this.setState({
            seatsWarningModal: this.state.seatsWarningModal ? false : true,
        });
    }

    handleSeatsConfirm(deptSeats, arrSeats) {
        this.setState({
            deptSeats: deptSeats,
            arrSeats: arrSeats,
        }, () => console.log("##################", this.state.deptSeats, this.state.arrSeats))
    }
    handleSignedIn() {
        this.setState({
            step: 1,
            activeStep: 1

        })
    }
    async handleConfirm() {
        const userId = localStorage.getItem('userId');
        const { deptFlight, arrFlight, deptCabin, arrCabin, totalPrice } = JSON.parse(sessionStorage.getItem('deal'))
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
        
        const { step, deptSeats, arrSeats, showModal, activeStep, skipped } = this.state
        const isStepOptional = (step) => {
            return step === 1;
        };

        const isStepSkipped = (step) => {
            return skipped.has(step);
        };

        const handleNext = () => {
            if (this.state.activeStep === 1) {

                //choosing seats 
                const { adults, children } = JSON.parse(sessionStorage.getItem('deal'));
                if (this.state.arrSeats.length < Number(adults) + Number(children) || this.state.deptSeats.length < Number(adults) + Number(children)) {
                    // alert("you must choose all seats")
                    this.setState({seatsWarningModal: true})
                } else {
                    let newSkipped = skipped;
                    if (isStepSkipped(activeStep)) {
                        newSkipped = new Set(newSkipped.values());
                        newSkipped.delete(activeStep);
                    }
                    this.setState({
                        activeStep: this.state.activeStep + 1,
                        skipped: newSkipped
                    }, () => console.log(this.state.activeStep))
                }
            } else {
                console.log("handling next ")
                let newSkipped = skipped;
                if (isStepSkipped(activeStep)) {
                    newSkipped = new Set(newSkipped.values());
                    newSkipped.delete(activeStep);
                }
                this.setState({
                    activeStep: this.state.activeStep + 1,
                    skipped: newSkipped
                }, () => console.log(this.state.activeStep))
            }

        };

        const handleBack = () => {
            this.setState({
                activeStep: this.state.activeStep - 1,

            })

        };

        const handleSkip = () => {
            if (!isStepOptional(activeStep)) {
                // You probably want to guard against something like this,
                // it should never occur unless someone's actively trying to break something.
                throw new Error("You can't skip a step that isn't optional.");
            }
            const newSkipped = new Set(skipped.values());
            newSkipped.add(activeStep);
            this.setState({
                activeStep: this.state.activeStep + 1,
                skipped: newSkipped
            })


        };

        const handleReset = () => {
            this.setState({
                activeStep: 0

            })
        };

        const { startDate } = this.state
        const { deptFlight, arrFlight, deptCabin, arrCabin, totalPrice } = sessionStorage.getItem('deal')
        return (
            <>
            <div style={{ backgroundColor: "background-color: rgba(0, 0, 0, 0.575)" }}>
                <MyHeader />
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} style={{ backgroundColor: "#edf0f0", height: "auto", padding: "15px", paddingLeft: "4.5%", paddingRight: "4.5%", marginTop: "0" }}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}  >
                                    <StepLabel style={{ marginTop: "0px !important", color: "white" }} {...labelProps}>{label}</StepLabel>

                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                            {activeStep == 0 ?
                                <div style={{ height: '59vh' }}>
                                    {/* your div of choice here  */}


                                    <ConfirmBooking className="slide-left" parentFunc={() => this.handleSignedIn()} deptSeats={deptSeats} arrSeats={arrSeats} totalPrice={totalPrice} />


                                </div> :
                                activeStep == 1 ?
                                    <div style={{ height: '59vh' }}>
                                        {/* your div of choice here  */}

                                        <ChooseSeats deptFlight={deptFlight} arrFlight={arrFlight} deptCabin={deptCabin} arrCabin={arrCabin} parentFunc={(deptSeats, arrSeats) => this.handleSeatsConfirm(deptSeats, arrSeats)} />



                                    </div> :
                                    activeStep == 2 ?
                                        <div style={{ height: '59vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                            <PassengersInfo single = {false} />

                                        </div> :
                                        <div style={{ height: '59vh' }}>
                                            {/* your div of choice here  */}
                                            <ConfirmBooking />
                                            <Payment single = {false} name={"Boomerang"} description={"flight from CAI to LAX "} amount={2191} />



                                        </div>
                            }

                            <div style={{ display: "flex", justifyContent: "space-around", color: "white", marginRight: "4%", marginLeft: "4%" }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    <ArrowBackIosNewIcon />Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {

                                    /* isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )           */

                                }

                                <Button
                                    disabled={!localStorage.getItem("token") ? true : false}
                                    onClick={handleNext} style={{ color: "white" }}>

                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'} <ArrowForwardIosIcon />
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </Box>





















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


            <Modal centered show={this.state.seatsWarningModal} onHide={this.handleSeatWarningShow.bind(this)} dialogClassName="my-modal">
                    <Modal.Header closeButton >
                        <Modal.Title style={{fontWeight:"600"}}>Heads up!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You must choose all seats to continue</Modal.Body>
                  
                     
                </Modal>

            </>
        )
    }
}
export default withRouter(Reservation)