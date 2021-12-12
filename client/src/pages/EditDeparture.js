import React, { Component } from 'react'
import SingleFlight from '../components/SingleFlight'
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";

export default class EditDeparture extends Component {
   
        deptTrip ={
            FlightNumber: "1175",
            DepartureTime: "10:10",
            ArrivalTime: "12:10",
            DepartureDate: "2021-09-12",
            ArrivalDate: "2021-09-13",
            EconomySeats: {
                AvailableSeats: 20,
                PriceAdult: 1000,
                PriceChild: 700,
                Seats: [
                    {
                        Seat: "A1",
                        Reserved: true,
                    }, {
                        Seat: "A1",
                        Reserved: true,
                    },
                    {
                        Seat: "A1",
                        Reserved: true,
                    }],
                    BaggageAllowance: {
                        Number: 4,
                        Size: 20
                    }
            },
            
    
            BusinessSeats: {
                AvailableSeats: 20,
                PriceAdult: 1500,
                PriceChild: 850,
                Seats: [
                    {
                        Seat: "A1",
                        Reserved: true,
                    }, {
                        Seat: "A1",
                        Reserved: true,
                    },
                    {
                        Seat: "A1",
                        Reserved: true,
                    }],
                    BaggageAllowance: {
                        Number: 4,
                        Size: 20
                    }
            },
            FirstClassSeats: {
                AvailableSeats: 20,
                PriceAdult: 2000,
                PriceChild: 700,
                Seats: [
                    {
                        Seat: "A1",
                        Reserved: true,
                    }, {
                        Seat: "A1",
                        Reserved: true,
                    },
                    {
                        Seat: "A1",
                        Reserved: true,
                    }],
                    BaggageAllowance: {
                        Number: 4,
                        Size: 20
                    }
            },
    
            DepartureTerminal: 10,
    
            ArrivalTerminal: 15,
    
            DepartureAirport: "CAI",
    
            ArrivalAirport: "LAX",
    
            TripDuration: "24h 30m",
           
        }

        state={
            flightArr: [this.deptTrip,this.deptTrip,this.deptTrip],
            searchResults:[],
            departureDateSearch: "",
            cabinSearch:"",
            deptDate:"",
            cabin:"",
            searchFlight:"",
            date:"",
            returnFlag:false,
            departureFlag:false,
        }

  

    componentDidMount(){
        if (this.props.location.pathname === "/editDep") {
           this.state.searchFlight = JSON.parse(sessionStorage.getItem('depFlight'));
           this.state.date = (JSON.parse(sessionStorage.getItem('retFlight'))).ArrivalDate;
           this.state.departureFlag = true;
        }
        else {
            this.state.searchFlight = JSON.parse(sessionStorage.getItem('reservation')).ArrFlight;
            this.state.date = JSON.parse(sessionStorage.getItem('reservation'));
            this.date.returnFlag = true;
        }
        
    }
    handleSearch(){

    }
    /*steps :
    1. get the old flight attributes i'm searching for from session
    2. get new values from user input
    3. get req all flights 
    4. and search 1&2 on 3 don't forget to check the dates
    5. display remember flightarr and filteredArr 
    6. no results card ?*/

    
    render() {
        const { searchResults ,deptDate,cabin} = this.state
        return (
            <div className = "flex-col">
               <div className="search-bar" style={{justifyContent:"center"}}>
                <Form.Group style={{ width:"20%"}} className="mb-2">
                
                <Form.Control
                    type="text"
                    onFocus={
                    (e) => {
                        e.currentTarget.type = "date";
                        e.currentTarget.focus();
                    }
                    }
                    onBlur={
                    (e) => (e.currentTarget.type = "text")
                    }
                    placeholder="Departure date"
                    value={deptDate}
                    name="deptDate"
                    onChange={this.handleSearch.bind(this)}
                />
                </Form.Group>

                <Form.Group style={{  width: "20%" }} className="mb-2">
                <Form.Select
                  value={cabin}
                  name="deptCabinClass"
                  onChange={this.handleSearch.bind(this)}
                  aria-label="Default select example">
                  <option hidden>Departure cabin </option>
                  <option value="EconomySeats">Economy</option>
                  <option value="BusinessSeats">Business class</option>
                  <option value="FirstClassSeats">First Class</option>
                </Form.Select>
               </Form.Group>




                </div>
                <div className="flex-col">
                    { searchResults.map((t) => (
                    <SingleFlight deptFlight={t}  />
                    ))}
                    
                </div>
            </div>
        )
    }
}
