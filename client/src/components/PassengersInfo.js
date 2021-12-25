import React, { Component } from 'react'
import Passenger from './Passenger';
export default class PassengersInfo extends Component {


    state = {
        passengersInfo: []
    }


    handlePassengerInfo(index, info) {
        let newPassengers = this.state.passengersInfo
        newPassengers[index] = info
        this.setState(
            {
                passengersInfo: newPassengers
            }
            , () => { sessionStorage.setItem("passengersInfo", JSON.stringify(this.state.passengersInfo)) })
    }
    componentDidMount() {
        let oldInfo = JSON.parse(sessionStorage.getItem("passengersInfo"));
        if (oldInfo) {
            console.log("old info isss ", oldInfo)
            this.setState({
                passengersInfo: oldInfo
            })
        } else {
            let totalPassenger = 0 ; 
            if(!this.props.single){
                const { deptFlight, arrFlight, deptCabin, arrCabin, adults, children } = JSON.parse(sessionStorage.getItem('deal'))
                const { passengers } = this.props;
                totalPassenger = Number(adults) + Number(children)
            }else{
                totalPassenger = 1 ; 
            }
            
            //first time to come here 
            let newPassengers = []
            let info = {
                firstName: "",
                lastName: "",
                type: "Adult",
                passport: ""
            }
            for (let i = 0; i < totalPassenger ; i++) {
                newPassengers[i] = info ;
            }
            this.setState({
                passengersInfo: newPassengers
            }, () => console.log("init passengers are ", this.state.passengersInfo)
            )
        }


    }
    render() {

       

        return (
            <div className="passengers-info">
                {
                    this.state.passengersInfo.map((p, index) => (
                        <Passenger 
                        firstName = {p.firstName}
                        lastName = {p.lastName}
                        type =  {p.type}
                        passport  = {p.passport}
                        index={index} 
                        parentFunc={(index, info) => { this.handlePassengerInfo(index, info) }} />
                    ))
                }
            </div>
        )
    }
}
