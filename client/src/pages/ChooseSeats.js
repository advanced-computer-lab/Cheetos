import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import Seats from '../components/Seats'

export default class ChooseSeats extends Component {
    render() {
        return (
            <div className ="seats-page">
                <MyHeader/>
                <Seats/>
            </div>
        )
    }
}
