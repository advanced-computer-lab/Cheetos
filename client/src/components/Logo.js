import React, { Component } from 'react'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

export default class Logo extends Component {
    render() {
        return (
            <div className="logo">
               <FlightTakeoffIcon style={{fontSize:"40px",marginRight:"10px"}}/> 
               <p>Boomerang</p> 
            </div>
        )
    }
}
