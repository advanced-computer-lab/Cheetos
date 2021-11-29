import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import Booking from '../components/Booking'

export default class MyBookings extends Component {
    render() {
        return (
            <div className="flex-col">
                <MyHeader/>
                <div className="trip-search-results">
                    <Booking/>
                    <Booking/>
                    <Booking/>
                    <Booking/>
                </div>
            </div>
        )
    }
}
