import React, { Component } from 'react'
import '../style/booking.css';
import SearchIcon from '@mui/icons-material/Search';
export default class NoResults extends Component {
    render() {
        const { deptAirport, arrAirport, deptDate, arrDate } = this.props
        return (
            <div className="no-result">
                <SearchIcon style={{ fontSize: "5rem" }} />
                <h2>Sorry, we couldn't find any flights from {deptAirport} to {arrAirport} on {deptDate} to {arrDate}</h2>
                <h6 style={{ color: "grey" }}>These airports may not have regularly scheduled flights or there may be restrictions that impact this route.
                </h6>
            </div>
        )
    }
}
