import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import Seats from '../components/Seats'
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
class ChooseSeats extends Component {
    state = {
        arrSeats: [],
        deptSeats: []
    }
    handleConfirm() {
        const {arrSeats , deptSeats} = this.state ; 
        const {  adults, children } = this.props.location.data
        if (arrSeats.length < Number(adults) + Number(children) ||deptSeats.length < Number(adults) + Number(children)  ) {
            alert("you must choose all seats")
        }else{
            this.props.parentFunc(deptSeats , arrSeats , this.props.location.data)
        }
    
    }
    handleSeatsChange(att, seats) {
        console.log(seats)
        this.setState(
            {
                ...this.state,
                [att]: seats
            }
        )
    }
    render() {
        const { deptFlight, arrFlight, deptCabin, arrCabin, adults, children } = this.props.location.data
        return (
            <div className="seats-page">
                {/* <MyHeader /> */}
                <div className="shuttles">
                    <Seats parentFunc={(att, num) => this.handleSeatsChange(att, num)} att="deptSeats" type="Departure flight" seatClass={deptCabin} passengers={Number(adults) + Number(children)} />
                    <Seats parentFunc={(att, num) => this.handleSeatsChange(att, num)} att="arrSeats" type="Return flight" seatClass={arrCabin} passengers={Number(adults) + Number(children)} />
                </div>
               
                    <Button
                        onClick={this.handleConfirm.bind(this)}
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
                
            </div>
        )
    }
}

export default withRouter(ChooseSeats);
