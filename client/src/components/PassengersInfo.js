import React, { Component } from 'react'
import Passenger from './Passenger';
export default class PassengersInfo extends Component {

    state = {
        passengersInfo: []
    }


    handlePassengerInfo(index, info) {
        this.setState(
            {
                passengersInfo: { ...this.state.passengersInfo, [index]: info }
            }
            , () => { console.log("passenger info is : ", this.state.passengersInfo , "index is :" , index   )  })
    }

    render() {

        const { deptFlight, arrFlight, deptCabin, arrCabin, adults, children } = JSON.parse(sessionStorage.getItem('deal'))
        const { passengers } = this.props;
        const totalPassenger = Number(adults) + Number(children)
        let passElems = []
        for (let i = 0; i < totalPassenger; i++) {
            passElems.push(<Passenger index={i} parentFunc={(index, info) => { this.handlePassengerInfo(index, info) }} />)
        }
        return (
            <div className="passengers-info">
                {passElems}
            </div>
        )
    }
}
