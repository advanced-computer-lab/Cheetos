import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from "react-bootstrap/Form";
export default class Passenger extends Component {
    state = {
        
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        type: this.props.type,
        passport: this.props.passport
    }
    handlePassengerInfoChange(e) {
        e.preventDefault();
        // const name = e.target.name
        //--- setting the state of search fields upon change 
        //doing the search and filtering 
        const value = e.target.value;
        this.setState(
            {
                ...this.state,
                [e.target.name]: value
            }, () => {
                this.props.parentFunc( this.props.index , 
                    {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        passport: this.state.passport,
                        seat: this.state.seat,
                        type: this.state.type
                    }
                )
            });
    }
    render() {

        const { seat, firstName, passport, lastName, type } = this.state
        return (
                <div>
            <div className="passenger">
                <h6>Passenger: {seat}</h6>


                <Form.Control onChange={this.handlePassengerInfoChange.bind(this)} name="firstName" value={firstName} size="sm" type="text" placeholder="first name" style = {{width: "60%"}}/>
                <Form.Control onChange={this.handlePassengerInfoChange.bind(this)} name="lastName" value={lastName} size="sm" type="text" placeholder="last name" style = {{width: "60%"}} />
                <Form.Control onChange={this.handlePassengerInfoChange.bind(this)} name="passport" value={passport} size="sm" type="text" placeholder="passport number" />
                <Form.Select  onChange={this.handlePassengerInfoChange.bind(this)} name="type" value={type} size="sm"  style = {{width: "60%"}}>
                    <option value="Adult">Adult</option>
                    <option value="Child">Child</option>
                </Form.Select>

            </div>

              

            </div >

        )
    }
}
