import React, { Component } from 'react'
import '../style/seats.css';

import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import Seat from './Seat';

class SingleSeats extends Component {
    state = {
        chosenSeats: this.props.preChosen ? this.props.preChosen : [],
        canChose: this.props.preChosen.length === this.props.passengers ? false : true,
        passengers: this.props.passengers, //should be initialised from props 
        seats: this.props.seats,
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
    componentDidMount() {

    }
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
            if (this.state.chosenSeats.length < this.props.passengers) {
                let newSeats = [...this.state.chosenSeats, seat];
                console.log(seat.Seat, this.state.passengers);
                if (chosen) {
                    this.setState({
                        chosenSeats: newSeats,
                        // passengers: newPassengers,
                        canChose: newSeats.length < this.props.passengers ? true : false
                    }, () => this.props.parentFunc(this.props.att, this.state.chosenSeats))
                } else {
                    this.setState({
                        chosenSeats: this.state.chosenSeats.filter((s) => s.Seat !== seat.Seat),
                        // passengers: this.state.passengers + 1
                    }, () => this.props.parentFunc(this.props.att, this.state.chosenSeats))
                }

            } else {
                if (this.state.canChose) {
                    this.setState({
                        canChose: false
                    })
                }

                if (!chosen) {
                    this.setState({
                        chosenSeats: this.state.chosenSeats.filter((s) => s.Seat !== seat.Seat),
                        // passengers: this.state.passengers + 1,
                        canChose: true
                    }, () => this.props.parentFunc(this.props.att, this.state.chosenSeats))
                }
            }

        }

    }

    render() {

        const { type, seatClass, passengers } = this.props
        //console.log(this.subs(this.props.seats));
        return (

            <div className="shuttle">
                <h3>{type}</h3>
                <h4>{seatClass === "FirstClassSeats" ? "First class" :
                    seatClass === "BusinessSeats" ? "Business class" :
                        seatClass === "EconomySeats" ? "Economy class" : ""}  : {this.state.chosenSeats.length}/{passengers} </h4>
                <div className="first-class">

                    {this.props.seats ? this.subs(this.props.seats).map((r) =>
                        <div className="seats-row">
                            {
                                r.map((s) =>
                                    <Seat seat={s} parentChosen={this.state.chosenSeats.some(chosenSeat => chosenSeat.Seat === s.Seat)} parentChoseSeats={(s, chosen) => this.handleChoseSeat(s, chosen)} canChose={this.state.canChose} />
                                )
                            }
                        </div>
                    ) : ''
                    }
                </div>



            </div>
        )
    }
}
export default SingleSeats