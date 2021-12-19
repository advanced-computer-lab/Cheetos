import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from "react-bootstrap/Form";
export default class Passenger extends Component {
    state = {
        seat: this.props.seat,
        name: "",
        type: "Adult"
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
          } , ()=>{
              this.props.parentFunc( this.state.seat , 
                  {
                      name : this.state.name , 
                      seat : this.state.seat , 
                      type : this.state.type 
                  }
              )
          });
      }
    render() {

        const { seat, name, type } = this.state
        return (

            <div className="passenger">
                <h6>Seat: {seat}</h6>
                <Form.Control onChange = {this.handlePassengerInfoChange.bind(this)} name = "name" value = {name} size="sm" type="text" placeholder="Passenger name" style = {{width : '75%'}}/>
                <Form.Select onChange = {this.handlePassengerInfoChange.bind(this)} name = "type" value = {type} size="sm"  style = {{width : '30%'}} >
                    <option value = "Adult">Adult</option>
                    <option value = "Child">Child</option>
                </Form.Select>

                {/* <DropdownButton size="sm" id="dropdown-basic-button" title="Adult"  >
                    <Dropdown.Item >Adult</Dropdown.Item>
                    <Dropdown.Item active = {true } >Child</Dropdown.Item>
                </DropdownButton> */}

            </div>

        )
    }
}
