import React, { Component } from 'react'
import '../style/seats.css';
import Form from "react-bootstrap/Form";
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import Seat from './Seat';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Passenger from './Passenger';
import Boxes from '../images/boxes.svg'
class Seats extends Component {
    state = {
        chosenSeats: [],
        canChose: true,
        passengers: this.props.passengers, //should be initialised from props 
        seats: this.props.seats,
        passengersInfo: {}
        // busArr : this.props.seats.map((e) => (
        //     { Seat: e, Reserved: false }

        // ))
    }
    seat = {
        Seat: "A1",
        Reserved: false

    }
    resSeat = {
        Seat: "A2",
        Reserved: true,

    }
    //firstArr = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"]
    // busArr = this.state.seats.map((e) => (
    //     { Seat: e, Reserved: false }

    // ))
    // busArr = [...this.busArr, this.resSeat, this.resSeat, this.resSeat, this.resSeat, this.resSeat, this.resSeat, this.resSeat, this.resSeat]

    // ecArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    subs(arr) {
        let newArr = []
        let sub = []
        let c = 0;
        for (let i = 0; i < arr.length; i++) {
            if (c < 4) {
                sub.push(arr[i])
                c++;
            } else {
                newArr = [...newArr, sub];
                sub = []
                sub.push(arr[i])
                c = 1;
            }
        }
        newArr = [...newArr, sub];
        return newArr;
    }
    handleChoseSeat(seat, chosen) {
        if (!seat.Reserved) {

            if (this.state.passengers > 0) {
                let newPassengers = this.state.passengers - 1;
                console.log(seat.Seat, this.state.passengers);
                if (chosen) {
                    this.setState({
                        chosenSeats: [...this.state.chosenSeats, seat],
                        passengers: newPassengers,
                        canChose: newPassengers == 0 ? false : true
                    }, () => this.props.parentFunc(this.props.att, this.state.chosenSeats))
                } else {
                    let newInfo = this.state.passengersInfo
                    delete newInfo[seat.Seat]
                    this.setState({
                        chosenSeats: this.state.chosenSeats.filter((s) => s.Seat !== seat.Seat),
                        passengers: this.state.passengers + 1,
                        passengersInfo: newInfo
                    }, () => this.props.parentFunc(this.props.att, this.state.chosenSeats))
                }

            } else {
                if (this.state.canChose) {
                    this.setState({
                        canChose: false
                    })
                }

                if (!chosen) {
                    let newInfo = this.state.passengersInfo
                    delete newInfo[seat.Seat]
                    this.setState({
                        chosenSeats: this.state.chosenSeats.filter((s) => s.Seat !== seat.Seat),
                        passengers: this.state.passengers + 1,
                        canChose: true,
                        passengersInfo: newInfo
                    }, () => this.props.parentFunc(this.props.att, this.state.chosenSeats))
                }
            }

        }
        console.log("in hereeee ", this.state.chosenSeats);
    }
    handlePassengerInfo(seat, info) {
        console.log("ssssssssssssssssssssssssssssssssssssss")
        this.setState(
            {
                passengersInfo: { ...this.state.passengersInfo, [seat]: info }
            }
            , () => { console.log("passenger info is : ", this.state.passengersInfo) })
    }

    render() {
        const { chosenSeats } = this.state
        const { type, seatClass, passengers } = this.props
        const seatClassName = seatClass === "FirstClassSeats" ? "First class" :
            seatClass === "BusinessSeats" ? "Business class" :
                seatClass === "EconomySeats" ? "Economy class" : ""
        console.log(this.subs(this.props.seats));
        return (

            <div className="shuttle-wrapper">
                <div className="shuttle">
                    <h3>{type}</h3>
                    <h4>{seatClassName}  </h4>
                    <div className="first-class">
                        {this.props.seats ? this.subs(this.props.seats).map((r) =>
                            <div className="seats-row">
                                {
                                    r.map((s) =>
                                        <Seat seat={s} parentChoseSeats={(s, chosen) => this.handleChoseSeat(s, chosen)} canChose={this.state.canChose} />
                                    )
                                }
                            </div>
                        ) : ''
                        }
                    </div>
                </div>
                <div className="vl" style={{ height: '100%' }}>

                </div>
                <div style = {{display : 'flex' , flexDirection : "column" , alignItems : 'centre' , width : '50%'}}>
                    <h3 style={{ paddingLeft: "1em" }}>Passengers Info : </h3>
                    <h4 style={{ paddingLeft: "1em" }}>Seats chosen : {this.state.chosenSeats.length}/{passengers}  </h4>
                    <div className="passengers-info" >
                        {chosenSeats.length != 0 ?
                            chosenSeats.map((s) =>
                                <Passenger seat={s.Seat} parentFunc={(seat, info) => { this.handlePassengerInfo(seat, info) }} />
                            ) : <div style = {{marginBottom : '1em' ,  display : "flex" , flexDirection : 'column' , alignItems : 'centre'}}>
                               
                                <img src={Boxes} alt="seats" width="200vw"/>
                                <h6>pick your desired seats</h6>
                            </div>

                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Seats