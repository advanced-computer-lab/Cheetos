import React, { Component } from 'react'
import SingleFlight from '../components/SingleFlight'
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import SearchIcon from '@mui/icons-material/Search';
import { withRouter } from 'react-router';
import NoResults from '../components/NoResults'
import '../style/EditFlight.css';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MyHeader from '../components/MyHeader';
import { Stepper, StepContent, StepLabel, Step } from '@mui/material';
import SingleFlightConfirm from '../components/SingleFlightConfirm';
import api from '../api'
import ConfirmBooking from './ConfirmBooking';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Payment from '../components/Payment';




const steps = ["Search", "Confirm", "Seats", "Payment"];

class EditDeparture extends Component {

    deptTrip = {
        FlightNumber: "1175",
        DepartureTime: "10:10",
        ArrivalTime: "12:10",
        DepartureDate: "2021-12-09",
        ArrivalDate: "2021-12-10",
        EconomySeats: {
            AvailableSeats: 20,
            PriceAdult: 1000,
            PriceChild: 700,
            Seats: [
                {
                    Seat: "A1",
                    Reserved: true,
                }, {
                    Seat: "A1",
                    Reserved: true,
                },
                {
                    Seat: "A1",
                    Reserved: true,
                }],
            BaggageAllowance: {
                Number: 4,
                Size: 20
            }
        },


        BusinessSeats: {
            AvailableSeats: 20,
            PriceAdult: 1500,
            PriceChild: 850,
            Seats: [
                {
                    Seat: "A1",
                    Reserved: true,
                }, {
                    Seat: "A1",
                    Reserved: true,
                },
                {
                    Seat: "A1",
                    Reserved: true,
                }],
            BaggageAllowance: {
                Number: 4,
                Size: 20
            }
        },
        FirstClassSeats: {
            AvailableSeats: 20,
            PriceAdult: 2000,
            PriceChild: 700,
            Seats: [
                {
                    Seat: "A1",
                    Reserved: true,
                }, {
                    Seat: "A1",
                    Reserved: true,
                },
                {
                    Seat: "A1",
                    Reserved: true,
                }],
            BaggageAllowance: {
                Number: 4,
                Size: 20
            }
        },

        DepartureTerminal: 10,

        ArrivalTerminal: 15,

        DepartureAirport: "LXR",

        ArrivalAirport: "CAI",

        TripDuration: "24h 30m",

    }

    deptTrip2 = {
        FlightNumber: "1175",
        DepartureTime: "10:10",
        ArrivalTime: "12:10",
        DepartureDate: "2021-12-05",
        ArrivalDate: "2021-12-10",
        EconomySeats: {
            AvailableSeats: 0,
            PriceAdult: 1000,
            PriceChild: 700,
            Seats: [
                {
                    Seat: "A1",
                    Reserved: true,
                }, {
                    Seat: "A1",
                    Reserved: true,
                },
                {
                    Seat: "A1",
                    Reserved: true,
                }],
            BaggageAllowance: {
                Number: 4,
                Size: 20
            }
        },


        BusinessSeats: {
            AvailableSeats: 20,
            PriceAdult: 1500,
            PriceChild: 850,
            Seats: [
                {
                    Seat: "A1",
                    Reserved: true,
                }, {
                    Seat: "A1",
                    Reserved: true,
                },
                {
                    Seat: "A1",
                    Reserved: true,
                }],
            BaggageAllowance: {
                Number: 4,
                Size: 20
            }
        },
        FirstClassSeats: {
            AvailableSeats: 20,
            PriceAdult: 2000,
            PriceChild: 700,
            Seats: [
                {
                    Seat: "A1",
                    Reserved: true,
                }, {
                    Seat: "A1",
                    Reserved: true,
                },
                {
                    Seat: "A1",
                    Reserved: true,
                }],
            BaggageAllowance: {
                Number: 4,
                Size: 20
            }
        },

        DepartureTerminal: 10,

        ArrivalTerminal: 15,

        DepartureAirport: "CAI",

        ArrivalAirport: "LXR",

        TripDuration: "24h 30m",

    }

    state = {
        flightsArr: [this.deptTrip, this.deptTrip, this.deptTrip2, this.deptTrip, this.deptTrip, this.deptTrip2], //all flights
        searchResults: [], //where i'm putting the filtering
        depDateSearch: "", //user input for dep date
        cabinSearch: "EconomySeats", // user input for cabin class
        searchFlight: "", // the flight i got from my booking
        date: "", // the date of the other flight
        departureFlag: false,
        clickedSearch: false,
        minDate: "",
        maxDate: "",
        activeStep: 0,
        skipped: new Set(),
        step: 0,
        seatsWarningModal:false,
    }
    /*
    to search i need a flight's dep and arr airport( from storage) ,
     dep date (userInput), cabin (userInput), 
     check flight has vacancy , check flight date with other flight 
    */



    async componentDidMount() {
        //getting all flights to search for when editing a flight 
        await api.getAllFlights().then(flights => {
            console.log("fligsht coming from db are ", flights.data)
            this.setState({
                flightsArr: flights.data,

            })
        })
        if (this.props.location.pathname === "/editDep") {

            this.setState({
                // arrival flight info 
                searchFlight: JSON.parse(sessionStorage.getItem('depFlight')),
                date: (JSON.parse(sessionStorage.getItem('retFlight'))).DepartureDate,
                departureFlag: true,
                depDateSearch: (JSON.parse(sessionStorage.getItem('depFlight'))).DepartureDate,
                // minDate : (JSON.parse(sessionStorage.getItem('depFlight'))).DepartureDate,
                minDate: new Date().toISOString().substring(0, 10),
                maxDate: (JSON.parse(sessionStorage.getItem('retFlight'))).DepartureDate,
            }, () => console.log("dates-----------------------------------------", this.state.depDateSearch))
            console.log("search flight is", this.state.searchFlight);

        }
        else {

            this.setState({
                //return flight info 
                searchFlight: JSON.parse(sessionStorage.getItem('retFlight')),
                date: (JSON.parse(sessionStorage.getItem('depFlight'))).ArrivalDate,
                depDateSearch: (JSON.parse(sessionStorage.getItem('retFlight'))).DepartureDate,
                minDate: (JSON.parse(sessionStorage.getItem('depFlight'))).ArrivalDate,
                departureFlag: false,
            })
            console.log("search flight is", this.state.searchFlight);
        }

    }
    handleSearch(e) {
        // setting the state of search fields upon change
        e.preventDefault();
        const value = e.target.value;

        this.setState(
            {
                ...this.state, [e.target.name]: value
            }
        );
    }
    andSearch() {
        const { flightsArr, deptCabinClass, searchResults,
            searchFlight, depDateSearch, cabinSearch, date,
            activeStep, skipped, step } = this.state;
        //doing the search and filtering 

        console.log("andSearch", searchFlight);

        if (this.state.departureFlag) {
            this.setState({
                searchResults: this.state.flightsArr.filter((f) =>
                    Date.parse(f.DepartureDate) === Date.parse(depDateSearch)
                    && f.DepartureAirport === searchFlight.DepartureAirport
                    && f.ArrivalAirport === searchFlight.ArrivalAirport
                    && f[cabinSearch]["AvailableSeats"] >= Number(1) //double check condition if we are adding child parent pairs
                    && Date.parse(f.ArrivalDate) < Date.parse(date)
                    //add date check   
                ),
                clickedSearch: true
            })
        }
        else {
            console.log("searching for return ", flightsArr)
            this.setState({
                searchResults: flightsArr.filter((f) =>
                    Date.parse(f.DepartureDate) === Date.parse(depDateSearch)
                    && f.DepartureAirport === searchFlight.DepartureAirport
                    && f.ArrivalAirport === searchFlight.ArrivalAirport
                    && f[cabinSearch]["AvailableSeats"] >= Number(1) //double check condition if we are adding child parent pairs
                    && Date.parse(f.DepartureDate) > Date.parse(date)
                    //add date check
                ),
                clickedSearch: true
            })
        }

        sessionStorage.setItem('cabinSearch', cabinSearch);
    }







    /*steps :
    1. get the old flight attributes i'm searching for from session
    2. get new values from user input
    3. get req all flights 
    4. and search 1&2 on 3 don't forget to check the dates
    5. display remember flightarr and filteredArr 
    6. no results card ?*/

    handleModalShow() {
        this.setState({
            seatsWarningModal: this.state.seatsWarningModal ? false : true,
        });
    }

    render() {
        const { searchResults, flightsArr, depDateSearch, cabinSearch,
            searchFlight, clickedSearch,
            activeStep, skipped, step } = this.state
        const handleBack = () => {
            this.setState({
                activeStep: this.state.activeStep - 1,

            })

        };
        const handleNext = () => {
            if (this.state.activeStep === 1) {

                //choosing seats 
                const { adults, children } = JSON.parse(sessionStorage.getItem('deal'));
                if (this.state.arrSeats.length < Number(adults) + Number(children) || this.state.deptSeats.length < Number(adults) + Number(children)) {
                    alert("you must choose all seats")
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
        const handleReset = () => {
            this.setState({
                activeStep: 0

            })
        };
        const isStepOptional = (step) => {
            return step === 1;
        };

        const isStepSkipped = (step) => {
            return skipped.has(step);
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
        return (
            <>
            <div className="flex-col" style = {{gap : '0'}}>
                <MyHeader />
                {/* <SingleFlightConfirm departureDate={"02-12-2021"} arrivalDate={"18-12-2021"} departureTime={"03:10"} arrivalTime={"03:10"} seat={"A1"} cabin={"EconomySeats"} price={"112"} /> */}

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


                                    {/* //search */}
                                    <div className = "flex-col">
                                        <div className="search-bar search-bar-box" style={{ justifyContent: "center" }}>
                                            <Form.Group style={{ width: "20%" }} className="mb-2">
                                                <Form.Label style={{ color: "white", fontWeight: "bold" }}>Departure Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    placeholder="Departure date"
                                                    value={depDateSearch}
                                                    name="depDateSearch"
                                                    onChange={this.handleSearch.bind(this)}
                                                    min={this.state.minDate}
                                                    max={this.state.maxDate}
                                                // maxDate={new Date("12-12-2021")}
                                                />
                                            </Form.Group>
                                            <Form.Group style={{ width: "20%" }} className="mb-2">
                                                <Form.Label style={{ color: "white", fontWeight: "bold" }}>Cabin Class</Form.Label>
                                                <Form.Select
                                                    value={cabinSearch}
                                                    name="cabinSearch"
                                                    onChange={this.handleSearch.bind(this)}
                                                    aria-label="Default select example">
                                                    <option hidden>Departure cabin </option>
                                                    <option value="EconomySeats">Economy</option>
                                                    <option value="BusinessSeats">Business class</option>
                                                    <option value="FirstClassSeats">First Class</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <div >
                                                <Button style={{ width: "auto", height: "39px", marginTop: "22px", padding: "1rem" }}
                                                    onClick={this.andSearch.bind(this)} variant="contained" >
                                                    <SearchIcon style={{ fontSize: "30px" }} />{" "}
                                                </Button>
                                            </div >
                                        </div>
                                        
                                        <div className="flex-col edit-box">
                                            {searchResults.length > 0 ?
                                                searchResults.map((t) => (
                                                    <SingleFlight deptFlight={t} />
                                                ))
                                                : clickedSearch ?
                                                    <>
                                                        <div className="flex-col no-res">
                                                            <SearchIcon style={{ fontSize: "5rem" }} />
                                                            <h2>Sorry, we couldn't find any flights from {searchFlight.DepartureAirport} to {searchFlight.ArrivalAirport} on {depDateSearch}</h2>
                                                            <h6 style={{ color: "grey" }}>These airports may not have regularly scheduled flights or there may be restrictions that impact this route.
                                                            </h6>
                                                        </div>
                                                    </> :
                                                    <div className="flex-col no-res">
                                                        <SearchIcon style={{ fontSize: "5rem" }} />
                                                        <h2>Search to find your ideal flight</h2>
                                                        <h6 style={{ color: "grey" }}>airports may not have regularly scheduled flights or there may be restrictions that impact this route.
                                                        </h6>
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                </div> :
                                activeStep == 1 ?

                                    <ConfirmBooking />

                                    :
                                    activeStep == 2 ?
                                        <div style={{ height: '59vh' }}>
                                            {/* your div of choice here  */}
                                            <h1>choose seaaaaaaaaaaaaaaaaaaaaaats</h1>
                                            {/* <ChooseSeats deptFlight={deptFlight} arrFlight={arrFlight} deptCabin={deptCabin} arrCabin={arrCabin} parentFunc={(deptSeats, arrSeats) => this.handleSeatsConfirm(deptSeats, arrSeats)} /> */}



                                        </div> :
                                        activeStep == 3 ?
                                            <div style={{ height: '59vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <h1>passnegersssssssssssssssssss seaaaaaaaaaaaaaaaaaaaaaats</h1>
                                                {/* <PassengersInfo /> */}

                                            </div> :
                                            <div style={{ height: '59vh' }}>
                                                {/* your div of choice here  */}
                                                <ConfirmBooking />
                                                <Payment name={"Boomerang"} description={"flight from CAI to LAX "} amount={2191} />



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

























            </div>

            <Modal centered show={this.state.seatsWarningModal} onHide={this.handleModalShow.bind(this)} dialogClassName="my-modal">
                    <Modal.Header closeButton >
                        <Modal.Title style={{fontWeight:"600"}}>Heads up!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You must choose all seats to continue</Modal.Body>
                   
                </Modal>

            </>
        )
    }
}
export default withRouter(EditDeparture)