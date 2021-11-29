import React, { Component } from 'react'
import '../style/trip.css';
import Button from "@mui/material/Button";
export default class Trip extends Component {
    render() {
        const {num , } = this.props 
        return (
            <div className="trip-card ">
                <div style={{ width: '70%'  , marginTop : '5px'}} >

                    {/* <div className="trip-flight"  >
                        <h4>{num}</h4>
                        <div className="trip-flex-col">
                            <h5>{times}</h5>
                            <p>{airports}</p>
                        </div>
                        <strong>{duration}</strong>
                        <a href = "#">more ></a>
                    </div> */}
                    <div className="trip-flight"  >
                        <h4>1602</h4>
                        <div className="trip-flex-col">
                            <h5>15:30-23:20</h5>
                            <p>LAX-CAI</p>
                        </div>
                        <strong>24h 10m</strong>
                        <a href = "#">more ></a>
                    </div>

                </div>
                <div className = "vl">

                </div>
                <div className="trip-flex-col" style={{ width: '30%' }} >
                    <h3>10,000$</h3>
                    <Button
                        onClick={this.handleProfileClick}
                        style={{
                            backgroundColor: "#37A1E2",
                            width: "60%",
                            height: "5vh",
                            fontSize: "small",
                        }}
                        //change for laterrrrrrrrrrrrrr
                        variant="contained"
                    >
                        View Deal
                    </Button>
                </div>
            </div>
        )
    }
}
